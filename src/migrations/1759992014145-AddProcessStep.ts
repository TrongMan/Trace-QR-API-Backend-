import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProcessStep1759992014145 implements MigrationInterface {
    name = 'AddProcessStep1759992014145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "process_step" ("id" SERIAL NOT NULL, "batchId" integer NOT NULL, "stepName" character varying(120) NOT NULL, "description" text, "stepOrder" integer NOT NULL DEFAULT '1', "startedAt" TIMESTAMP WITH TIME ZONE, "finishedAt" TIMESTAMP WITH TIME ZONE, "meta" jsonb, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1fed204ea80bdaac2977b3529d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "process_step" ADD CONSTRAINT "FK_f355fbefb4d36792bde5c9ebf16" FOREIGN KEY ("batchId") REFERENCES "batch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process_step" DROP CONSTRAINT "FK_f355fbefb4d36792bde5c9ebf16"`);
        await queryRunner.query(`DROP TABLE "process_step"`);
    }

}
