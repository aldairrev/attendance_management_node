FROM node:16

USER root
# root
RUN npm i -g npm

USER node
# node user
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

RUN echo "Running Node"
