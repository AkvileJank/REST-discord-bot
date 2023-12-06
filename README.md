# Discord bot with REST API

## Project description

This is a discord bot REST API made with Node.js and Express.js, wrapping a SQLite database. It is created to deal with sending congratulatory messages on discord for learners, that have completed the learning part.

## Sprints

Endpoints:

- GET /sprints

- GET /sprints/:code

- DELETE sprints/:code

- POST /sprints with request body providing code and title:

```
	{
		"code": "s1",
		"title": "First sprint"
	}
```

- PATCH /sprints/:code with request providing new title:

```
	{
		"title": "updated title"
	}
```

## Templates:

- GET /templates

- GET /templates/:id

- DELETE templates/:id

- POST /templates with request body providing content:

```
	{
		"content": "Congratulations!"
	}
```

- PATCH templates/:id with request providing new content:

```
	{
		"content": "Updated congratulations!"
	}
```

## Users

- POST users/ with request body providing user:

```
	{
		"user": "testUser"
	}
```

## Messages

- GET /messages

- GET /messages?username=testUser

- GET /messages?sprintCode=s1

- POST /messages with request body providing username and sprint code:

```
	{
		"username": "testUser",
		"sprintCode": "s1"
	}
```

## Setup

Create a local .env file and populate it with variables:

```
DATABASE_URL = 'Path to your database file'

BOT_TOKEN = 'Your discord bot token key'

TENOR_KEY = 'Tenor API KEY'

SERVER_ID = 'Discord server ID (guild ID)'

CHANNEL_ID = 'Discord channel ID'
```

## Install dependencies:

```bash

npm  i

```

## Migrations

We can run migrations with the following command:

```bash

npm  run  migrate:latest

```

## Updating types

```bash

npm  run  gen:types

```

## Loading the database

Example data for seeing functionality is loaded when the app is started.

## Running tests

```bash

npm  test

```

## Running the server

In development mode:

```bash

npm  run  dev

```

In production mode:

```bash

npm  run  start

```
