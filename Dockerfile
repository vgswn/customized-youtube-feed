FROM node:lts-alpine3.17

RUN addgroup -S appuser && adduser -S -G appuser appuser

RUN apk add --no-cache dumb-init

RUN mkdir -p /home/appuser/app/node_modules && chown -R appuser:appuser /home/appuser/app

WORKDIR /home/appuser/app

COPY --chown=appuser:appuser package*.json ./

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python3 && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps && apk add bash && apk add curl

USER appuser


COPY --chown=appuser:appuser . .

EXPOSE 8080

CMD ["dumb-init", "node", "server.js"]