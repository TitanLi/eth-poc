FROM ubuntu:16.04

LABEL maintainer = "Lisheng0706@gmail.com"

USER root

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update
RUN apt-get install software-properties-common -y
RUN add-apt-repository -y ppa:ethereum/ethereum
RUN apt-get update
RUN apt-get install ethereum -y
RUN apt-get install vim -y
RUN apt-get update

# Install nvm with node and npm
RUN apt-get install build-essential libssl-dev -y
RUN apt-get install curl -y
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install git
RUN apt-get install git -y

# Git clone eth-netstats
RUN git clone https://github.com/cubedro/eth-netstats
RUN cd /eth-netstats \ 
    && source $NVM_DIR/nvm.sh \
    && npm install -g npm \
    && npm install \
    && npm install -g grunt-cli

# Git clone eth-net-intelligence-api
RUN git clone https://github.com/cubedro/eth-net-intelligence-api
RUN cd /eth-net-intelligence-api \ 
    && source $NVM_DIR/nvm.sh \
    && npm install -g npm \
    && npm install \
    && npm install -g pm2

#ENTRYPOINT source ~/.profile

# Install jq for json use
RUN apt-get install jq -y

# Install screen
RUN apt-get install screen -y


COPY .env /.env
COPY app.js /api/app.js
COPY package.json /api/package.json
RUN cd api \
    && source $NVM_DIR/nvm.sh \
    && npm install -g npm \
    && npm install -g pm2 \
    && npm install

COPY ./app.json /eth-net-intelligence-api/app.json
COPY ./apple.json /apple.json
COPY ./ethereum.sh /ethereum.sh

RUN echo pm2 start /api/app.js --name eth-newNode >> /root/.bashrc
EXPOSE 8545:8545 3000:3000