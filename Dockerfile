FROM nginx:1.17.1

RUN rm -f /etc/nginx/nginx.conf \
    && rm -f /etc/nginx/conf.d/default.conf
COPY docker/nginx.80.conf /etc/nginx/conf.d/nginx.80.conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
LABEL maintainer="shaohq@foxmail.com"

EXPOSE 80

COPY ./docs /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
