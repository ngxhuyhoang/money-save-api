import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691818960283 implements MigrationInterface {
    name = 'Migration1691818960283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, INDEX \`IDX_24dbc6126a28ff948da33e97d3\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transactions_categories\` (\`categories_id\` int NOT NULL, \`transactions_id\` int NOT NULL, INDEX \`IDX_842a49c2b7f94766b7dbfd816a\` (\`categories_id\`), INDEX \`IDX_2cb45ec7a72a9feb3388611d2c\` (\`transactions_id\`), PRIMARY KEY (\`categories_id\`, \`transactions_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transactions_categories\` ADD CONSTRAINT \`FK_842a49c2b7f94766b7dbfd816a6\` FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`transactions_categories\` ADD CONSTRAINT \`FK_2cb45ec7a72a9feb3388611d2cb\` FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions_categories\` DROP FOREIGN KEY \`FK_2cb45ec7a72a9feb3388611d2cb\``);
        await queryRunner.query(`ALTER TABLE \`transactions_categories\` DROP FOREIGN KEY \`FK_842a49c2b7f94766b7dbfd816a6\``);
        await queryRunner.query(`DROP INDEX \`IDX_2cb45ec7a72a9feb3388611d2c\` ON \`transactions_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_842a49c2b7f94766b7dbfd816a\` ON \`transactions_categories\``);
        await queryRunner.query(`DROP TABLE \`transactions_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_24dbc6126a28ff948da33e97d3\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
