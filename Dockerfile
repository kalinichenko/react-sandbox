FROM node:8.9-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 3000
CMD node ./dist/ssr.js
