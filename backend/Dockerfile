# Выбранный образ node:18-slim
# Почему именно этот образ? https://snyk.io/blog/choosing-the-best-node-js-docker-image/

# Если нужно получить хеш образа
# docker pull node:18-slim или затем docker images --digests
FROM node:18-slim as base
# Создаём папку для проекта сразу с правильным владельцем
RUN mkdir /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
EXPOSE 5000
COPY --chown=node:node package*.json yarn*.lock ./



FROM base as dev
# устанавливаем openssl, чтобы решить конфликт с prisma CLI
RUN apt-get update -y && apt-get install -y openssl
ENV NODE_ENV=development
COPY prisma ./prisma
# USER node
RUN npm install
COPY . .
RUN npm run prisma:generate
CMD ["npm", "run", "dev"]



FROM base as preprod
COPY --chown=node:node . .
RUN npm install
RUN npm run build



FROM node:18-slim as prod
# dumb-init запускается на PID 1 и проксирует внешние signals в node.js process, позволяя решить проблемы с потерей этих signals
# Linux kernel обращается с PID 1 не так, как с другими идентификаторами процессов, 
# Например, сигнал SIGTERM не будет обработан процессом с PID 1, на котором по дефолту запускается node.js 
# Удаляем файлы списков пакетов /var/lib/apt/lists/, тем самым сокращая размер образа.
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV production

RUN npm i npm@latest -g
RUN mkdir /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
EXPOSE 5000
USER node
COPY --chown=node:node package*.json yarn*.lock ./

# Используем ci для того, чтобы улучшить производительность и надёжность за счёт того, 
# что устанавливаем зависимости, указанные в файле package-lock.json и гарантируем, что они будут точно такими же, как и при последней установке.
# Убираем development зависимости
# Очищаем кеш
RUN npm ci --omit=dev && npm cache clean --force

# Копируем точечно папку dist, скомпиленную со stage preprod, чтобы не тянуть лишние dev зависимости
COPY --from=preprod /usr/src/app/dist /usr/src/app/dist

# Запишем в переменную окружения PATH бинарник node
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

# Избегаем посредников вроде npm, для того, чтобы не терять внешние signals в контейнер
# Используем the execform notation (квадратные скобки) - она работает напрямую без shell обёртки
# тем самым любые внешние сигналы в контейнер напрямую отправляются в process
# Используем dumb-init для обхода проблемы с PID 1
CMD [ "dumb-init", "node", "./dist/index.js"]