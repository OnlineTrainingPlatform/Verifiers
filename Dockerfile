# Preparation and creation stage
# Using a builder stage in order to cache npm installs on seperate stage
FROM node as builder

# Set current user to non-root in current working directory
WORKDIR /dist
RUN chown node:node ./
USER node

# This stage is strictly for development dependencies
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# Copy package confs to builder and make a clean install
COPY package*.json ./
RUN npm ci -D && npm cache clean --force

# Copy src and tsconfig on seperate layers as src is highly volatile to changes
COPY src/ ./src/
COPY tsconfig.json ./
# runs rimraf and tsc dev devdependencies and requires tsconfig.json for tsc
RUN npm run build

# The runtime stage
FROM node:slim

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Set current user to non-root in current working directory
WORKDIR /app
RUN chown node:node ./
USER node

# Copy the distribution files from the builder to the working directory
COPY --from=builder /dist ./

# Install production dependencies
RUN npm ci && npm cache clean --force

# Port to expose which can be overwritten with docker-compose
ARG PORT=8080
EXPOSE $PORT

# Setup healthcheck
HEALTHCHECK --interval=10s --timeout=2s --start-period=15s \
    CMD ["node", "/healthcheck.js"]

# Execute NodeJS (not NPM script) to handle SIGTERM and SIGINT signals.
CMD ["node", "./build/index.js"]