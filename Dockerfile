FROM node:latest
RUN mkdir -p /home/www/express
WORKDIR /home/www/express
COPY . /home/www/express
#RUN npm install
EXPOSE 8080
ENTRYPOINT ["npm", "run"]
CMD ["serve"]
