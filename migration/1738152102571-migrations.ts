import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738152102571 implements MigrationInterface {
    name = 'Migrations1738152102571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_user_role_enum" AS ENUM('admin', 'manager', 'normal')`);
        await queryRunner.query(`CREATE TYPE "public"."user_user_status_enum" AS ENUM('created', 'active', 'inactive', 'suspended')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email_id" character varying NOT NULL, "password" character varying, "user_role" "public"."user_user_role_enum" NOT NULL DEFAULT 'normal', "first_name" character varying, "last_name" character varying, "user_status" "public"."user_user_status_enum" NOT NULL DEFAULT 'created', "email_verified_at" TIMESTAMP, "team_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_95c07c16136adcfdcb8221c1fc9" UNIQUE ("email_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_user_role_enum"`);
    }

}
