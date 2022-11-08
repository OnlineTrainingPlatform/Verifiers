# Environments.ts
Make sure to create an environments.ts in the src folder.
The file should have the following:
#### `export const VERIFYTA_PATH = 'insert_your_path_to_verifyta_exe_here';`

[![Continous Integration](https://github.com/OnlineTrainingPlatform/Verifiers/actions/workflows/continous_integration.yml/badge.svg)](https://github.com/OnlineTrainingPlatform/Verifiers/actions/workflows/continous_integration.yml)
[![Continous Delivery](https://github.com/OnlineTrainingPlatform/Verifiers/actions/workflows/continous_delivery.yml/badge.svg)](https://github.com/OnlineTrainingPlatform/Verifiers/actions/workflows/continous_delivery.yml)
# 🧰 Simple TypeScript Starter | 2022

> We talk about a lot of **advanced Node.js and TypeScript** concepts on [the blog](https://khalilstemmler.com), particularly focused around Domain-Driven Design and large-scale enterprise application patterns. However, I received a few emails from readers that were interested in seeing what a basic TypeScript starter project looks like. So I've put together just that.

### Features

- Minimal
- TypeScript v4
- Testing with Jest
- Linting with Eslint and Prettier
- Pre-commit hooks with Husky
- VS Code debugger scripts
- Local development with Nodemon

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.

#### `npm run build-docker`

Builds the Docker image and tags with with both version and "dev"
