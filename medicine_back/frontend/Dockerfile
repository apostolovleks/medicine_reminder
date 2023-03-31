FROM node:14

WORKDIR /medicine_reminder/medicine_back/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]