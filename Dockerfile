FROM node:20.11 as build
WORKDIR /app

COPY . .
RUN npm i
RUN npm run build
CMD ["npm", "start"]