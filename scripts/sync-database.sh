# Backup
# docker exec money_save_database /usr/bin/mysqldump -u hoang --password=12345678 DATABASE > backup.sql
# docker exec money_save_database /usr/bin/mysqldump --routines --single-transaction --set-gtid-purged=OFF -u hoang --password=12345678 --host=66.42.53.107 --databases e_commerce_dev > e_commerce_dev_backup.sql
# docker exec money_save_database /usr/bin/mysqldump --defaults-file=mysql-config.cnf --routines --single-transaction --set-gtid-purged=OFF --databases e_commerce_dev > e_commerce_dev_backup.sql
# Lấy Database từ Host về local và ghi vào file e_commerce_dev_backup.sql
docker exec money_save_database sh -c 'exec mysqldump --databases money_save_database -uhoang -p12345678 -h66.42.53.107 --verbose' > money_save_database_backup.sql


# Restore
# cat e_commerce_dev_backup.sql | docker exec -i money_save_database /usr/bin/mysql -u hoang --password=12345678 e_commerce_dev
# cat e_commerce_dev_backup.sql | docker exec -i money_save_database /usr/bin/mysql --defaults-file=./mysql-config.cnf --routines --single-transaction --set-gtid-purged=OFF --databases e_commerce_dev
docker exec -i money_save_database sh -c 'exec mysql -uroot -p12345678 --database money_save_database --verbose' < money_save_database_backup.sql
