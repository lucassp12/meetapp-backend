FROM node:12

RUN npm i -g yarn

WORKDIR /home/app

RUN mkdir -p node_modules && chown -R node:node .

USER node

COPY package.json yarn.* ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3333

CMD ["yarn", "start"]
