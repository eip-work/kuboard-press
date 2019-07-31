#!/bin/sh
echo "start dnsmasq"
service dnsmasq start
echo ${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT_HTTPS}
sed -i s/KUBERNETES_SERVICE_HOST/${KUBERNETES_SERVICE_HOST}/g /etc/nginx/conf.d/nginx.80.conf
sed -i s/KUBERNETES_SERVICE_PORT_HTTPS/${KUBERNETES_SERVICE_PORT_HTTPS}/g /etc/nginx/conf.d/nginx.80.conf
echo "start nginx"
nginx -g "daemon off;"