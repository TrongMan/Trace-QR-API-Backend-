import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1759512939104 implements MigrationInterface {
    name = 'InitSchema1759512939104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "batch" ("id" SERIAL NOT NULL, "batchCode" character varying NOT NULL, "productionDate" date NOT NULL, "expiryDate" date NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_57da3b830b57bec1fd329dcaf43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c22cc6a2ed278459ed55a311da" ON "batch" ("batchCode") `);
        await queryRunner.query(`CREATE TABLE "scan_log" ("id" SERIAL NOT NULL, "scannedAt" TIMESTAMP NOT NULL DEFAULT now(), "location" character varying, "device" character varying, "qrcodeId" integer, CONSTRAINT "PK_3bf6f0e8fa1e46e7b7ccb76fa22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "qr_code" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "UQ_3b142bec7ab9d3d4a0f744cc473" UNIQUE ("code"), CONSTRAINT "PK_21be15bed42505b3cddf438a037" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sku" character varying, "ownerId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "batch" ADD CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scan_log" ADD CONSTRAINT "FK_dc506977f2adca310735d0d0008" FOREIGN KEY ("qrcodeId") REFERENCES "qr_code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "qr_code" ADD CONSTRAINT "FK_cbf92f47b379bfbbb46a9a48587" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52"`);
        await queryRunner.query(`ALTER TABLE "qr_code" DROP CONSTRAINT "FK_cbf92f47b379bfbbb46a9a48587"`);
        await queryRunner.query(`ALTER TABLE "scan_log" DROP CONSTRAINT "FK_dc506977f2adca310735d0d0008"`);
        await queryRunner.query(`ALTER TABLE "batch" DROP CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "qr_code"`);
        await queryRunner.query(`DROP TABLE "scan_log"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c22cc6a2ed278459ed55a311da"`);
        await queryRunner.query(`DROP TABLE "batch"`);
    }

}
