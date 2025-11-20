import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1763593215483 implements MigrationInterface {
    name = 'CreateUsersTable1763593215483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`full_name\` varchar(255) NOT NULL,
                \`mobile_number\` varchar(255) NULL,
                \`account_verified\` enum ('yes', 'no') NOT NULL DEFAULT 'no',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`),
                UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    }

}
