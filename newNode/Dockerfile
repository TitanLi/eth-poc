FROM ethereum
COPY ./app.js /api/app.js
COPY ./package.json /api/package.json
RUN npm install
COPY ./app.json /eth-net-intelligence-api/app.json
COPY ./apple.json /apple.json
EXPOSE 8545:8545