# todo: дописать нормальный конфиг для dev и prod
# Выбранный образ - node:18.18-bullseye-slim
# Почему именно этот образ? https://snyk.io/blog/choosing-the-best-node-js-docker-image/

# Если нужно получить хеш образа
# docker pull node:18.18-bullseye-slim или затем docker images --digests
FROM node:18.18-bullseye-slim as dev

WORKDIR /usr/src/app

EXPOSE 3000

COPY package*.json .

RUN npm install

COPY . .

# используем the execform notation - она работает напрямую без shell обёртки
# тем самым любые внешние сигналы в контейнер напрямую отправляются в process
CMD [ "npm", "run", "dev" ]