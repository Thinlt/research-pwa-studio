##############################################################
# This file is intended to be used with ./docker-compose.yml #
##############################################################

FROM node:10.14.1-alpine as build
# working directory
WORKDIR /usr/src/app

# global environment setup : yarn + dependencies needed to support node-gyp
RUN apk --no-cache --virtual add \
    python \
    make \
    g++ \
    yarn 

# copy just the dependency files and configs needed for install
COPY packages/peregrine/package.json ./packages/peregrine/package.json
COPY packages/pwa-buildpack/package.json ./packages/pwa-buildpack/package.json
COPY packages/upward-js/package.json ./packages/upward-js/package.json
COPY packages/upward-spec/package.json ./packages/upward-spec/package.json
COPY packages/venia-concept/package.json ./packages/venia-concept/package.json
# COPY packages/siminia/package.json ./packages/siminia/package.json
COPY package.json yarn.lock babel.config.js browserslist.js magento-compatibility.js ./

# install dependencies with yarn
# RUN yarn install --frozen-lockfile
# RUN yarn install

# copy over the rest of the package files
COPY packages ./packages

# copy configuration env file from host file system to venia-concept .env for build
COPY ./docker/.env.docker.dev ./packages/venia-concept/.env
COPY ./docker/entrypoint ./entrypoint
# # build the app
# RUN echo "172.18.0.1 magento.localhost" >> /etc/hosts && yarn run build 

# MULTI-STAGE BUILD
FROM node:10.14.1-alpine
# working directory
WORKDIR /usr/src/app

# global environment setup
RUN apk --no-cache --virtual add \
    python \
    make \
    g++ \
    yarn 

# copy build from previous stage
COPY --from=build /usr/src/app .
# node:alpine comes with a configured user and group
RUN chown -R node:node /usr/src/app
USER root
# Pass the `HOST` arg from docker-compose args and set it to the HOST
# ARG HOST
# command to run application
ENTRYPOINT ["/bin/sh", "-c"]
CMD ["./entrypoint"]
# CMD [ "yarn", "workspace", "@magento/venia-concept", "run", "watch", "-- --host ${HOST}"]
