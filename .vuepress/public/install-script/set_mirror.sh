#!/usr/bin/env bash
set -e

if [ -z "$1" ]
then
    echo 'Error: Registry-mirror url required.'
    exit 1
fi

MIRROR_URL=$1
lsb_dist=''
command_exists() {
    command -v "$@" > /dev/null 2>&1
}
if command_exists lsb_release; then
    lsb_dist="$(lsb_release -si)"
    lsb_version="$(lsb_release -rs)"
fi
if [ -z "$lsb_dist" ] && [ -r /etc/lsb-release ]; then
    lsb_dist="$(. /etc/lsb-release && echo "$DISTRIB_ID")"
    lsb_version="$(. /etc/lsb-release && echo "$DISTRIB_RELEASE")"
fi
if [ -z "$lsb_dist" ] && [ -r /etc/debian_version ]; then
    lsb_dist='debian'
fi
if [ -z "$lsb_dist" ] && [ -r /etc/fedora-release ]; then
    lsb_dist='fedora'
fi
if [ -z "$lsb_dist" ] && [ -r /etc/os-release ]; then
    lsb_dist="$(. /etc/os-release && echo "$ID")"
fi
if [ -z "$lsb_dist" ] && [ -r /etc/centos-release ]; then
    lsb_dist="$(cat /etc/*-release | head -n1 | cut -d " " -f1)"
fi
if [ -z "$lsb_dist" ] && [ -r /etc/redhat-release ]; then
    lsb_dist="$(cat /etc/*-release | head -n1 | cut -d " " -f1)"
fi
lsb_dist="$(echo $lsb_dist | cut -d " " -f1)"
docker_version="$(docker -v | awk '{print $3}')"
docker_major_version="$(echo $docker_version| cut -d "." -f1)"
docker_minor_version="$(echo $docker_version| cut -d "." -f2)"
lsb_dist="$(echo "$lsb_dist" | tr '[:upper:]' '[:lower:]')"

set_daemon_json_file(){
    DOCKER_DAEMON_JSON_FILE="/etc/docker/daemon.json"
    if sudo test -f ${DOCKER_DAEMON_JSON_FILE}
    then
        sudo cp  ${DOCKER_DAEMON_JSON_FILE} "${DOCKER_DAEMON_JSON_FILE}.bak"
        if sudo grep -q registry-mirrors "${DOCKER_DAEMON_JSON_FILE}.bak";then
            sudo cat "${DOCKER_DAEMON_JSON_FILE}.bak" | sed -n "1h;1"'!'"H;\${g;s|\"registry-mirrors\":\s*\[[^]]*\]|\"registry-mirrors\": [\"${MIRROR_URL}\"]|g;p;}" | sudo tee ${DOCKER_DAEMON_JSON_FILE}
        else
            sudo cat "${DOCKER_DAEMON_JSON_FILE}.bak" | sed -n "s|{|{\"registry-mirrors\": [\"${MIRROR_URL}\"],|g;p;" | sudo tee ${DOCKER_DAEMON_JSON_FILE}
        fi
    else
        sudo mkdir -p "/etc/docker"
        sudo echo "{\"registry-mirrors\": [\"${MIRROR_URL}\"]}" | sudo tee ${DOCKER_DAEMON_JSON_FILE}
    fi
}


can_set_json(){
	if [ "$docker_major_version" -eq 1 ] && [ "$docker_minor_version" -lt 12 ] 
	then
		echo "docker version < 1.12"
		return 0
	else
		echo "docker version >= 1.12"
		return 1
	fi
}

restart_docker () {
    echo "systemctl daemon-reload"
    systemctl daemon-reload
    echo "systemctl restart docker"
    systemctl restart docker
    echo
    echo -e "\033[31;1m--------请检查下面输出结果中的 Registry Mirrors 是否已经修改过来-------- \033[0m"
    echo "docker info"
    docker info
}

set_mirror(){
    if [ "$docker_major_version" -eq 1 ] && [ "$docker_minor_version" -lt 9 ]
        then
            echo "please upgrade your docker to v1.9 or later"
            exit 1
    fi

    case "$lsb_dist" in
        centos)
        if grep "CentOS release 6" /etc/redhat-release > /dev/null
        then
            DOCKER_SERVICE_FILE="/etc/sysconfig/docker"
            sudo cp ${DOCKER_SERVICE_FILE} "${DOCKER_SERVICE_FILE}.bak"
            sudo sed -i "s|other_args=\"|other_args=\"--registry-mirror='${MIRROR_URL}'|g" ${DOCKER_SERVICE_FILE}
            sudo sed -i "s|OPTIONS='|OPTIONS='--registry-mirror='${MIRROR_URL}'|g" ${DOCKER_SERVICE_FILE}
            echo "Success."
            restart_docker
            exit 0
        fi
        if grep "CentOS Linux release 7" /etc/redhat-release > /dev/null
        then
            if can_set_json; then
                DOCKER_SERVICE_FILE="/lib/systemd/system/docker.service"
                sudo cp ${DOCKER_SERVICE_FILE} "${DOCKER_SERVICE_FILE}.bak"
                sudo sed -i "s|\(ExecStart=/usr/bin/docker[^ ]* daemon\)|\1 --registry-mirror="${MIRROR_URL}"|g" ${DOCKER_SERVICE_FILE}
                sudo systemctl daemon-reload
            else
                set_daemon_json_file
            fi
            echo "Success."
            restart_docker
            exit 0
        else
            echo "Error: Set mirror failed, please set registry-mirror manually please."
            exit 1
        fi
    ;;
        fedora)
        if grep "Fedora release" /etc/fedora-release > /dev/null
        then
            if can_set_json; then
            DOCKER_SERVICE_FILE="/lib/systemd/system/docker.service"
            sudo cp ${DOCKER_SERVICE_FILE} "${DOCKER_SERVICE_FILE}.bak"
            sudo sed -i "s|\(ExecStart=/usr/bin/docker[^ ]* daemon\)|\1 --registry-mirror="${MIRROR_URL}"|g" ${DOCKER_SERVICE_FILE}
            sudo systemctl daemon-reload
            else
                set_daemon_json_file
            fi
            echo "Success."
            restart_docker
            exit 0
        else
            echo "Error: Set mirror failed, please set registry-mirror manually please."
            exit 1
        fi
    ;;
        ubuntu)
        v1=`echo ${lsb_version} | cut -d "." -f1`
        if [ "$v1" -ge 16 ]; then
            if can_set_json; then
                DOCKER_SERVICE_FILE="/lib/systemd/system/docker.service"
                sudo cp ${DOCKER_SERVICE_FILE} "${DOCKER_SERVICE_FILE}.bak"
                sudo sed -i "s|\(ExecStart=/usr/bin/docker[^ ]* daemon -H fd://$\)|\1 --registry-mirror="${MIRROR_URL}"|g" ${DOCKER_SERVICE_FILE}
                sudo systemctl daemon-reload
            else
                set_daemon_json_file
            fi
            echo "Success."
            echo "You need to restart docker to take effect: sudo systemctl restart docker.service"
            exit 0
        else
            if can_set_json; then
                DOCKER_SERVICE_FILE="/etc/default/docker"
                sudo cp ${DOCKER_SERVICE_FILE} "${DOCKER_SERVICE_FILE}.bak"
                if grep "registry-mirror" ${DOCKER_SERVICE_FILE} > /dev/null
                then
                    sudo sed -i -u -E "s#--registry-mirror='?((http|https)://)?[a-zA-Z0-9.]+'?#--registry-mirror='${MIRROR_URL}'#g" ${DOCKER_SERVICE_FILE}
                else
                    echo 'DOCKER_OPTS="$DOCKER_OPTS --registry-mirror='${MIRROR_URL}'"' >> ${DOCKER_SERVICE_FILE}
                    echo ${MIRROR_URL}
                fi
            else
                set_daemon_json_file
            fi
        fi
        echo "Success."
        restart_docker
        exit 0
    ;;
        debian)
        if can_set_json; then
            DOCKER_SERVICE_FILE="/etc/default/docker"
            sudo cp ${DOCKER_SERVICE_FILE} "${DOCKER_SERVICE_FILE}.bak"
            if grep "registry-mirror" ${DOCKER_SERVICE_FILE} > /dev/null
            then
                sudo sed -i -u -E "s#--registry-mirror='?((http|https)://)?[a-zA-Z0-9.]+'?#--registry-mirror='${MIRROR_URL}'#g" ${DOCKER_SERVICE_FILE}
            else
                echo 'DOCKER_OPTS="$DOCKER_OPTS --registry-mirror='${MIRROR_URL}'"' >> ${DOCKER_SERVICE_FILE}
                echo ${MIRROR_URL}
            fi
        else
            set_daemon_json_file
        fi
        echo "Success."
        restart_docker
        exit 0
    ;;
        arch)
        if grep "Arch Linux" /etc/os-release > /dev/null
        then
            if can_set_json; then
                DOCKER_SERVICE_FILE="/lib/systemd/system/docker.service"
                sudo cp ${DOCKER_SERVICE_FILE} "${DOCKER_SERVICE_FILE}.bak"
                sudo sed -i "s|\(ExecStart=/usr/bin/docker[^ ]* daemon -H fd://\)|\1 --registry-mirror="${MIRROR_URL}"|g" ${DOCKER_SERVICE_FILE}
                sudo systemctl daemon-reload
            else
                set_daemon_json_file
            fi
            echo "Success."
            restart_docker
            exit 0
        else
            echo "Error: Set mirror failed, please set registry-mirror manually please."
            exit 1
        fi
    ;;
        suse)
        if grep "openSUSE Leap" /etc/os-release > /dev/null
        then
            if can_set_json; then
            DOCKER_SERVICE_FILE="/usr/lib/systemd/system/docker.service"
            sudo cp ${DOCKER_SERVICE_FILE} "${DOCKER_SERVICE_FILE}.bak"
            sudo sed -i "s|\(^ExecStart=/usr/bin/docker daemon -H fd://\)|\1 --registry-mirror="${MIRROR_URL}"|g" ${DOCKER_SERVICE_FILE}
            sudo systemctl daemon-reload
            else
                set_daemon_json_file
            fi
            echo "Success."
            restart_docker
            
            exit 0
        else
            echo "Error: Set mirror failed, please set registry-mirror manually please."
            exit 1
        fi
    esac
    echo "Error: Unsupported OS, please set registry-mirror manually."
    exit 1
}

set_mirror
