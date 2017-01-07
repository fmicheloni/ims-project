FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD mail.jar app.jar
ADD start.sh /start.sh
RUN sh -c 'touch /app.jar'
ENTRYPOINT ["sh", "/start.sh", "mongodb-auth.unibz.com"]