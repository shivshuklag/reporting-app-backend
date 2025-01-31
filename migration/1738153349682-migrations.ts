import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738153349682 implements MigrationInterface {
    name = 'Migrations1738153349682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."team_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" "public"."team_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_role"`);
        await queryRunner.query(`DROP TYPE "public"."user_user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_status"`);
        await queryRunner.query(`DROP TYPE "public"."user_user_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'manager', 'normal')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'normal'`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('created', 'active', 'inactive', 'suspended')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT 'created'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_user_status_enum" AS ENUM('created', 'active', 'inactive', 'suspended')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_status" "public"."user_user_status_enum" NOT NULL DEFAULT 'created'`);
        await queryRunner.query(`CREATE TYPE "public"."user_user_role_enum" AS ENUM('admin', 'manager', 'normal')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_role" "public"."user_user_role_enum" NOT NULL DEFAULT 'normal'`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TYPE "public"."team_status_enum"`);
    }

}
