# Quick Start

For the complete installation guide see [Install Kubernetes Multi-cluster Management Platform - Kuboard v4](/en/install/).

Prerequisites:

- docker engine
- amd64 or arm64 CPU

Steps:

- Create a local directory `kuboard-v4`

- Create a file `docker-compose.yaml` inside it:

  ```yaml
  configs:
    create_db_sql:
      content: |
        CREATE DATABASE kuboard DEFAULT CHARACTER SET = 'utf8mb4' DEFAULT COLLATE = 'utf8mb4_unicode_ci';
        create user 'kuboard'@'%' identified by 'kuboardpwd';
        grant all privileges on kuboard.* to 'kuboard'@'%';
        FLUSH PRIVILEGES;

  services:
    db:
      image: swr.cn-east-2.myhuaweicloud.com/kuboard/mariadb:11.3.2-jammy
      # image: mariadb:11.3.2-jammy
      # swr.cn-east-2.myhuaweicloud.com/kuboard/mariadb:11.3.2-jammy is identical to mariadb:11.3.2-jammy
      environment:
        MARIADB_ROOT_PASSWORD: kuboardpwd
        MYSQL_ROOT_PASSWORD: kuboardpwd
        TZ: Asia/Shanghai
      volumes:
        - ./kuboard-mariadb-data:/var/lib/mysql:Z
      configs:
        - source: create_db_sql
          target: /docker-entrypoint-initdb.d/create_db.sql
          mode: 0777
      networks:
        kuboard_v4_dev:
          aliases:
            - db
    kuboard:
      image: swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4
      # image: eipwork/kuboard:v4
      environment:
        - DB_DRIVER=org.mariadb.jdbc.Driver
        - DB_URL=jdbc:mariadb://db:3306/kuboard?serverTimezone=Asia/Shanghai
        - DB_USERNAME=kuboard
        - DB_PASSWORD=kuboardpwd
      ports:
        - "8000:80"
      volumes:
        - ./kuboard-log:/app/logs:Z
      depends_on:
        - db
      networks:
        kuboard_v4_dev:
          aliases:
            - kuboard

  networks:
    kuboard_v4_dev:
      driver: bridge
  ```

- Run the following command in the `kuboard-v4` directory:

  ```sh
  docker compose up -d
  ```

- Open Kuboard in a browser, e.g.:

  `http://localhost:8000/login`

  The login page looks like this:

  ![Kuboard login page](./install.assets/kuboard_login.png)

- Log in:

  - Administrator: `admin`
  - Default password: `Kuboard123`

  **You have finished installing Kuboard v4.** Next, use the UI to:

  - Change the `admin` password
  - Create users and grant authorizations
  - Import your Kubernetes cluster

## Integrate an External User Repository

Kuboard v4 integrates with external user repositories (e.g. LDAP) through a webhook interface. See [https://github.com/eip-work/kuboard-v4-ldap-example](https://github.com/eip-work/kuboard-v4-ldap-example)