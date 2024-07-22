FROM postgres
COPY packages/database/init.sql /docker-entrypoint-initdb.d/
