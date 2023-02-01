import { MigrationInterface, QueryRunner } from "typeorm"

export class EnableFuzzyStrMatchExtension1675171722124 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pg_trgm"'`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch"'`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP EXTENSION IF EXISTS "pg_trgm"`)
        await queryRunner.query(`DROP EXTENSION IF EXISTS "fuzzystrmatch"`)
    }

}
