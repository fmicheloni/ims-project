##!/bin/bash
#
## Initialize MySQL database.
## ADD this file into the container via Dockerfile.
## Assuming you specify a VOLUME ["/var/lib/mysql"] or `-v /var/lib/mysql` on the `docker run` command…
## Once built, do e.g. `docker run your_image /path/to/docker-mysql-initialize.sh`
## Again, make sure MySQL is persisting data outside the container for this to have any effect.
#
#set -e
#set -x
#
#mysqld --initialize --explicit_defaults_for_timestamp=1
#
## Start the MySQL daemon in the background.
#/usr/sbin/mysqld &
#mysql_pid=$!
#
##until mysqladmin ping >/dev/null 2>&1; do
##  echo -n "."; sleep 0.2
##done
#sleep 30
#
## Permit root login without password from outside container.
#mysql -e "GRANT ALL ON *.* TO root@'%' IDENTIFIED BY '' WITH GRANT OPTION"
#
## create the default database from the ADDed file.
#mysql < create_schema.sql
#
## Tell the MySQL daemon to shutdown.
#mysqladmin shutdown
#
## Wait for the MySQL daemon to exit.
#wait $mysql_pid

#!/bin/bash

## Initialize MySQL database.
## ADD this file into the container via Dockerfile.
## Assuming you specify a VOLUME ["/var/lib/mysql"] or `-v /var/lib/mysql` on the `docker run` command…
## Once built, do e.g. `docker run your_image /path/to/docker-mysql-initialize.sh`
## Again, make sure MySQL is persisting data outside the container for this to have any effect.
#
export MYSQL_ROOT_PASSWORD="root"
#
#set -e
#set -x
#
##mysql_install_db --basedir=/opt/mysql/mysql --datadir=/opt/mysql/mysql/data
#mysqld --initialize --explicit_defaults_for_timestamp=1
##--user=root
#
## Start the MySQL daemon in the background.
#/usr/sbin/mysqld --explicit_defaults_for_timestamp=1 &
#mysql_pid=$!
#
#until mysqladmin ping >/dev/null 2>&1; do
#  echo -n "."; sleep 1
#done
#
## Permit root login without password from outside container.
#mysql -e "GRANT ALL ON *.* TO root@'%' IDENTIFIED BY '' WITH GRANT OPTION"
#
## create the default database from the ADDed file.
##mysql < /tmp/epcis_schema.sql
#
## Tell the MySQL daemon to shutdown.
#mysqladmin shutdown
#
## Wait for the MySQL daemon to exit.
#wait $mysql_pid
#
## create a tar file with the database as it currently exists
##tar czvf default_mysql.tar.gz /var/lib/mysql
#
## the tarfile contains the initialized state of the database.
## when the container is started, if the database is empty (/var/lib/mysql)
## then it is unpacked from default_mysql.tar.gz from
## the ENTRYPOINT /tmp/run_db script

/usr/bin/mysqld_safe &
sleep 5
mysql -u root -e "CREATE DATABASE mydb"
mysql -u root mydb < /create_schema.sql