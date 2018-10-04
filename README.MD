# User Service

Service response for user management.

## Clone

```bash
git clone TBD
```

## Build

Build npm project

```bash
npm i
```

Build docker images

```bash
 docker build -t user-service .
```

## Test

Run unit and integration test

```bash
npm test
```

Check code coverage

```bash
npm start nyc
```

or with html report

```bash
npm start nyc-report
```

Run end to end test

```bash
TBD
```

## Run

Run locally 

```bash
npm start
```

Run thru docker compose

Create `.env` file with own configuration

```
DB_HOST=1localhost
DB_PORT=5432
DB_NAME=user-service-prod
DB_USER=user-service
DB_PASSWORD=user-service-password
```

and run 

```bash
docker-compose up
```
