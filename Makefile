#!make

.PHONY: all
all: stop install build nyc start e2e stop



MODULE := ./node_modules/.bin
COMPOSE := docker-compose -f docker-compose.yml

.PHONY: install
install:
	@echo "--- Installing dependencies."
	npm install

.PHONY: build
build:
	@echo "--- Build project."
	docker build -t user-service .

.PHONY: test
test:
	@echo "--- Running tests"
	npm run test

.PHONY: nyc
nyc:
	@echo "--- Running tests with nyc."
	npm run nyc-report

.PHONY: start
start:
	@echo "--- Building Docker and running app."
	${COMPOSE} up -d

.PHONY: stop
stop:
	@echo "--- Stop everything!"
	${COMPOSE} down

.PHONY: clear
clear:
	@echo "--- Clearing everything!"
	rm -rf output

.PHONY: e2e
e2e:
	@echo "--- Running integration tests"
	sleep 20s # FIXME https://stackoverflow.com/questions/35069027/docker-wait-for-postgresql-to-be-running
	npm run e2e
