import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1760033311584 implements MigrationInterface {
    name = 'InitialDatabase1760033311584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "process_step" ("id" SERIAL NOT NULL, "batchId" integer NOT NULL, "stepName" character varying(120) NOT NULL, "description" text, "stepOrder" integer NOT NULL DEFAULT '1', "startedAt" TIMESTAMP WITH TIME ZONE, "finishedAt" TIMESTAMP WITH TIME ZONE, "meta" jsonb, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1fed204ea80bdaac2977b3529d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "batch" ("id" SERIAL NOT NULL, "batchCode" character varying NOT NULL, "productionDate" date NOT NULL, "expiryDate" date NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_57da3b830b57bec1fd329dcaf43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c22cc6a2ed278459ed55a311da" ON "batch" ("batchCode") `);
        await queryRunner.query(`CREATE TABLE "scan_log" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "location" text, "device" text, "ip" text, "userAgent" text, "qrcodeId" integer NOT NULL, CONSTRAINT "PK_3bf6f0e8fa1e46e7b7ccb76fa22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "qrcode" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "UQ_80cdedb15af2715410bb48bec55" UNIQUE ("code"), CONSTRAINT "PK_9aaafe9e77dce17001051dab68a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sku" character varying, "ownerId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "process_step" ADD CONSTRAINT "FK_f355fbefb4d36792bde5c9ebf16" FOREIGN KEY ("batchId") REFERENCES "batch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "batch" ADD CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scan_log" ADD CONSTRAINT "FK_dc506977f2adca310735d0d0008" FOREIGN KEY ("qrcodeId") REFERENCES "qrcode"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "qrcode" ADD CONSTRAINT "FK_db4555ce9a631eec4a518202d72" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52"`);
        await queryRunner.query(`ALTER TABLE "qrcode" DROP CONSTRAINT "FK_db4555ce9a631eec4a518202d72"`);
        await queryRunner.query(`ALTER TABLE "scan_log" DROP CONSTRAINT "FK_dc506977f2adca310735d0d0008"`);
        await queryRunner.query(`ALTER TABLE "batch" DROP CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e"`);
        await queryRunner.query(`ALTER TABLE "process_step" DROP CONSTRAINT "FK_f355fbefb4d36792bde5c9ebf16"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "qrcode"`);
        await queryRunner.query(`DROP TABLE "scan_log"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c22cc6a2ed278459ed55a311da"`);
        await queryRunner.query(`DROP TABLE "batch"`);
        await queryRunner.query(`DROP TABLE "process_step"`);
    }

}
