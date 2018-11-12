# Authentication

This is the authentication microservice which provides functionality for registering and authenticating users from any other microservice.

The users are authenticated using JWT tokens.

## Setup and install

### Prerequisites

You should have Node.js installed on your computer (preferably version 10 and up).

### Installing and running the development environment

First clone this repository on your local machine and run
```bash
npm install
```
Then, you can run the development server by using the command
```bash
npm run dev
```

## Notes

This service currently saves users into an SQLite database for testing and development purposes. To work well with other microservices, switching to a more scalable approach would be of great appropriacy.
