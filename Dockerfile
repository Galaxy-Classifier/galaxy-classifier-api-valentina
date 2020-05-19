FROM node:12.16.3-stretch

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm ci
RUN npm i -g pm2

CMD ["pm2-runtime", "start", "ecosystem.config.js"]