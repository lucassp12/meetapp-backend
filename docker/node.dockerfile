FROM node:12

RUN npm i -g yarn

WORKDIR /home/app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build
