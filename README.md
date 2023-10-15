# Advanced todo-list fullstack application with Docker and best practices
# Backend: Fastify
# Frontend: React + TypeScript + Vite

Key features

1. Commitlint - ...
commit format: https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines
#todo...

# How to start

1. Create folder db/password.txt and write any password is up to you, but strictly one line without any space and /n/r
2. Rename .env-example to .env and fill env variables POSTGRES_USER and POSTGRES_DB how you want
3. Go to for docker-compose.yml file and make sure that dev or prod mode is set (line 4 and line 30)
4. For production run docker compose up -d --build
5. For development run docker compose watch