import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691807538954 implements MigrationInterface {
    name = 'Migration1691807538954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`avatar_url\` varchar(255) NULL, \`date_of_birth\` datetime NULL, \`account_id\` int NULL, INDEX \`IDX_3dd8bfc97e4a77c70971591bdc\` (\`id\`), INDEX \`IDX_8fe96f23833f524e653a5ddeb6\` (\`first_name\`), INDEX \`IDX_70ba8f02ea95a55982b5b1edec\` (\`last_name\`), INDEX \`IDX_532caf92d4c175d5682fa7c7e7\` (\`avatar_url\`), INDEX \`IDX_77c374da3e9f2d81bee3f1f734\` (\`date_of_birth\`), UNIQUE INDEX \`REL_a39874be76793f8a9be22dcf4d\` (\`account_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('income', 'expense') NOT NULL, \`account_id\` int NULL, INDEX \`IDX_a219afd8dd77ed80f5a862f1db\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NOT NULL, INDEX \`IDX_54115ee388cdb6d86bb4bf5b2e\` (\`id\`), INDEX \`IDX_4c8f96ccf523e9a3faefd5bdd4\` (\`email\`), INDEX \`IDX_1810939ed60edf0bce9545523b\` (\`refresh_token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a39874be76793f8a9be22dcf4df\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_49c0d6e8ba4bfb5582000d851f0\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_49c0d6e8ba4bfb5582000d851f0\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a39874be76793f8a9be22dcf4df\``);
        await queryRunner.query(`DROP INDEX \`IDX_1810939ed60edf0bce9545523b\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c8f96ccf523e9a3faefd5bdd4\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_54115ee388cdb6d86bb4bf5b2e\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_a219afd8dd77ed80f5a862f1db\` ON \`transactions\``);
        await queryRunner.query(`DROP TABLE \`transactions\``);
        await queryRunner.query(`DROP INDEX \`REL_a39874be76793f8a9be22dcf4d\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_77c374da3e9f2d81bee3f1f734\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_532caf92d4c175d5682fa7c7e7\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_70ba8f02ea95a55982b5b1edec\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_8fe96f23833f524e653a5ddeb6\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_3dd8bfc97e4a77c70971591bdc\` ON \`profile\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
