FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=password1234
ENV MYSQL_DATABASE=online_kupovina
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=password1234

COPY online_kupovina.sql /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/online_kupovina.sql

RUN echo "character-set-server=utf8mb4" >> /etc/mysql/my.cnf
RUN echo "collation-server=utf8mb4_unicode_ci" >> /etc/mysql/my.cnf

EXPOSE 3306

CMD ["mysqld"]
