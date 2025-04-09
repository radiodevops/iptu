up:
	docker-compose up -d

core-up:
	docker-compose up -d postgres mongo

down:
	docker-compose down

logs:
	docker-compose logs -f

psql:
	docker exec -it postgres-demo psql -U teacher school_db

mongo:
	docker exec -it mongo-demo mongosh -u mongoadmin -p password123

backup:
	chmod +x scripts/backup.sh
	./scripts/backup.sh

restore:
	@echo "Usage: make restore POSTGRES_BACKUP=<file> MONGO_BACKUP=<dir>"
	@if [ -n "$(POSTGRES_BACKUP)" ] && [ -n "$(MONGO_BACKUP)" ]; then \
		chmod +x scripts/restore.sh; \
		./scripts/restore.sh $(POSTGRES_BACKUP) $(MONGO_BACKUP); \
	fi

health:
	@echo "Checking PostgreSQL health..."
	@docker exec postgres-demo pg_isready -U teacher -d school_db || echo "PostgreSQL is not healthy!"
	@echo "Checking MongoDB health..."
	@docker exec mongo-demo mongosh --eval "db.adminCommand('ping')" || echo "MongoDB is not healthy!"

# Monitoring commands
monitoring-up:
	docker-compose up -d prometheus grafana postgres-exporter mongodb-exporter

monitoring-down:
	docker-compose stop prometheus grafana postgres-exporter mongodb-exporter

# Testing commands
test-install:
	pip install -r tests/requirements.txt

test:
	pytest tests/ -v

test-coverage:
	pytest tests/ --cov=. --cov-report=term-missing -v

# Migration commands
migrate:
	chmod +x scripts/run_migrations.sh
	./scripts/run_migrations.sh
