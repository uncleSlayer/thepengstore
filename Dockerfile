FROM node

WORKDIR /thePengStore

COPY . .

RUN rm -rf node_modules

RUN npm i

RUN npm run build

RUN npx prisma generate --schema ./apps/api/prisma/schema.prisma

RUN npm run start