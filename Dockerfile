FROM node:20.12-slim

WORKDIR /app

COPY . ./

RUN npm install

RUN npm link

RUN chmod +x ./src/index.js

CMD ["./src/index.js"]
