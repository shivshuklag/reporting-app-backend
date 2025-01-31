import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738223148158 implements MigrationInterface {
    name = 'Migrations1738223148158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "team_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "team_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "team_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "team_id" integer`);
    }

}
