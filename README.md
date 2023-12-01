## Setup

Create a local .env file and populate it with DATABASE_URL and BOT_TOKEN:

```
DATABASE_URL = 'Path to your database file!'
BOT_TOKEN = 'Your discord bot token key'

```

## Install dependencies:

```bash
npm i
```

## Migrations

We can run migrations with the following command:

```bash
npm run migrate:latest
```

## Updating types

```bash
npm run gen:types
```

## Running tests

```bash
npm test
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
```

