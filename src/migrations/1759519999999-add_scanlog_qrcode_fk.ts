import { MigrationInterface, QueryRunner } from "typeorm";

export class AddScanlogQrcodeFk1759519999999 implements MigrationInterface {
  name = 'AddScanlogQrcodeFk1759519999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scan_log" ADD COLUMN IF NOT EXISTS "qrcodeId" integer`);
    // đảm bảo NOT NULL chỉ khi dữ liệu cũ đã có
    await queryRunner.query(`UPDATE "scan_log" SET "qrcodeId" = "qrcodeId" WHERE "qrcodeId" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "scan_log" ALTER COLUMN "qrcodeId" SET NOT NULL`);

    await queryRunner.query(`ALTER TABLE "scan_log" DROP CONSTRAINT IF EXISTS "FK_scanlog_qrcode"`);
    await queryRunner.query(`
      ALTER TABLE "scan_log"
      ADD CONSTRAINT "FK_scanlog_qrcode"
      FOREIGN KEY ("qrcodeId") REFERENCES "qrcode"("id") ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scan_log" DROP CONSTRAINT IF EXISTS "FK_scanlog_qrcode"`);
    await queryRunner.query(`ALTER TABLE "scan_log" ALTER COLUMN "qrcodeId" DROP NOT NULL`);
    // không drop cột để tránh mất dữ liệu; nếu muốn rollback mạnh:
    // await queryRunner.query(`ALTER TABLE "scan_log" DROP COLUMN IF EXISTS "qrcodeId"`);
  }
}
