FROM node:18

WORKDIR /pages

COPY  . /pages

ENV REACT_APP_REST=/api

RUN npm install

RUN npm run build

CMD ["serve", "-s", ]