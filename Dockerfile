root@jenkins test-agent]# cat Dockerfile
FROM nginx
COPY ./dist/index.html /app/
COPY ./dist/static/js /app/static/js
COPY ./dist/static/css /app/static/css
COPY ./dist/static/fonts /app/static/fonts
COPY ./dist/static/img /app/static/img
#COPY ./nginx.conf /etc/nginx/conf/nginx.conf
#COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
