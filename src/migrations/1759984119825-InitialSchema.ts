import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1759984119825 implements MigrationInterface {
    name = 'InitialSchema1759984119825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scan_log" DROP CONSTRAINT "fk_scanlog_qrcode"`);
        await queryRunner.query(`CREATE TABLE "batch" ("id" SERIAL NOT NULL, "batchCode" character varying NOT NULL, "productionDate" date NOT NULL, "expiryDate" date NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_57da3b830b57bec1fd329dcaf43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c22cc6a2ed278459ed55a311da" ON "batch" ("batchCode") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createdat"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sku"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "sku" character varying`);
        await queryRunner.query(`ALTER TABLE "qrcode" DROP CONSTRAINT "qrcode_code_key"`);
        await queryRunner.query(`ALTER TABLE "qrcode" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "qrcode" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "qrcode" ADD CONSTRAINT "UQ_80cdedb15af2715410bb48bec55" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "qrcode" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "qrcode" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "scan_log" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scan_log" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "batch" ADD CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "qrcode" ADD CONSTRAINT "FK_db4555ce9a631eec4a518202d72" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scan_log" ADD CONSTRAINT "FK_dc506977f2adca310735d0d0008" FOREIGN KEY ("qrcodeId") REFERENCES "qrcode"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scan_log" DROP CONSTRAINT "FK_dc506977f2adca310735d0d0008"`);
        await queryRunner.query(`ALTER TABLE "qrcode" DROP CONSTRAINT "FK_db4555ce9a631eec4a518202d72"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52"`);
        await queryRunner.query(`ALTER TABLE "batch" DROP CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e"`);
        await queryRunner.query(`ALTER TABLE "scan_log" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "scan_log" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "qrcode" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "qrcode" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "qrcode" DROP CONSTRAINT "UQ_80cdedb15af2715410bb48bec55"`);
        await queryRunner.query(`ALTER TABLE "qrcode" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "qrcode" ADD "code" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "qrcode" ADD CONSTRAINT "qrcode_code_key" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sku"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "sku" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "createdat" TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c22cc6a2ed278459ed55a311da"`);
        await queryRunner.query(`DROP TABLE "batch"`);
        await queryRunner.query(`ALTER TABLE "scan_log" ADD CONSTRAINT "fk_scanlog_qrcode" FOREIGN KEY ("qrcodeId") REFERENCES "qrcode"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
