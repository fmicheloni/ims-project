FROM mysql:latest

ADD initDb.sh /initDb.sh
ADD create_schema.sql /create_schema.sql
ADD run_db.sh /run_db.sh

RUN \
 chown -R mysql:mysql /var/lib/mysql && \
 chmod +x /initDb.sh && \
 chmod +x /run_db.sh
# apt-get update && apt-get dist-upgrade -y && \
# apt-get install psmisc -y -q && \
# apt-get autoremove -y && apt-get clean && \
# rm -rf /var/cache/* && rm -rf /var/lib/apt/lists/*

#RUN /initDb.sh

#ENTRYPOINT ["/run_db.sh"]