import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738225789223 implements MigrationInterface {
    name = 'Migrations1738225789223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_onboarding_state_enum" AS ENUM('signup', 'verified', 'completed')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "onboarding_state" "public"."user_onboarding_state_enum" NOT NULL DEFAULT 'signup'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "onboarding_state"`);
        await queryRunner.query(`DROP TYPE "public"."user_onboarding_state_enum"`);
    }

}
