import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCoreTables1752505771108 implements MigrationInterface {
    name = 'CreateCoreTables1752505771108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_categories" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "services" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "unit" varchar NOT NULL, "quantity" float NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "serviceCategoryId" varchar, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "service_items" ("id" varchar PRIMARY KEY NOT NULL, "united_price" decimal(10,2) NOT NULL, "percentage" decimal(10,2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "serviceId" varchar, "activityId" varchar, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "activities" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "united_price" decimal(10,2), "percentage_amount" decimal(10,2), "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "provider_items" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "amount" decimal(10,2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "providerId" varchar, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(40), "dni" varchar(20) NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar, "addressId" varchar)`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "description" text, "start_date" date NOT NULL DEFAULT ('2025-07-14'), "end_date" date NOT NULL DEFAULT ('2025-07-14'), "status" varchar NOT NULL DEFAULT ('PENDING'), "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "projectId" varchar, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "code" integer, "description" text, "start_date" date NOT NULL DEFAULT ('2025-07-14'), "end_date" date NOT NULL DEFAULT ('2025-07-14'), "type_client" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "clientId" varchar, "branchId" varchar, "userId" varchar, "addressId" varchar)`);
        await queryRunner.query(`CREATE TABLE "branches" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(40), "dni" varchar(20) NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar, "addressId" varchar)`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "country" varchar(100) NOT NULL, "state" varchar(100) NOT NULL, "city" varchar(100) NOT NULL, "postal_code" varchar(100) NOT NULL, "main_address" varchar(100) NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "providers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(40), "dni" varchar(20) NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar, "addressId" varchar)`);
        await queryRunner.query(`CREATE TABLE "prices" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "amount" decimal(10,2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "activity_items" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "percentage" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "providerId" varchar, "providerItemId" varchar, "activityId" varchar, "priceId" varchar, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "dni" varchar(20) NOT NULL, "phone" varchar(40), "is_active" boolean NOT NULL DEFAULT true, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "settings" ("id" varchar PRIMARY KEY NOT NULL, "locale" varchar NOT NULL DEFAULT ('es'), "coin" varchar NOT NULL DEFAULT ('COP'), "theme" varchar NOT NULL DEFAULT ('light'), "is_sidebar_collapsed" boolean NOT NULL DEFAULT false, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(100) NOT NULL, "dni" varchar(20), "phone" varchar(20), "refresh_token" varchar, "reset_paasword_token" varchar, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_5fe9cfa518b76c96518a206b350" UNIQUE ("dni"))`);
        await queryRunner.query(`CREATE TABLE "vats" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "value" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "utility_expenses" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "value" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "contingency_expenses" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "value" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "admin_expenses" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "value" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamp, "userId" varchar)`);

        // ADDING FOREIGN KEYS
        await queryRunner.query(`ALTER TABLE "service_categories" ADD CONSTRAINT "FK_3914911d12818d49a61374962f3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_dc4034c116fe114758992e11c58" FOREIGN KEY ("serviceCategoryId") REFERENCES "service_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_3905389899d96c4f1b3619f68d5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_items" ADD CONSTRAINT "FK_96dc4e3108ef91b79bb9fa36293" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_items" ADD CONSTRAINT "FK_2ffd8c1397bab6ef81d27409884" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_items" ADD CONSTRAINT "FK_828023f0b3eb110017a20dbbc35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5a2cfe6f705df945b20c1b22c71" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "provider_items" ADD CONSTRAINT "FK_1219901b88cc8f4deb19d12d24b" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "provider_items" ADD CONSTRAINT "FK_e5d564c80f7df03dede5943a931" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_59c1e5e51addd6ebebf76230b37" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_091f9433895a53408cb8ae3864f" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_0650b2d6b04b496edfed1c3b910" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_03339c5eda13c64f273a1b848ec" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_6ce5806182de665bd49dadad4c3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_7fc85a35416284146d732986c6f" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "providers" ADD CONSTRAINT "FK_b0a257f97e76b698c4935b27d7d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "providers" ADD CONSTRAINT "FK_4b0d0c4263e4deeadb572481319" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "prices" ADD CONSTRAINT "FK_788cf5bee8c7803724520878089" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activity_items" ADD CONSTRAINT "FK_5348a562a32bd260b7cc95e5591" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activity_items" ADD CONSTRAINT "FK_baae3b878405ac579a12d804e0e" FOREIGN KEY ("providerItemId") REFERENCES "provider_items"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activity_items" ADD CONSTRAINT "FK_8fa5aeb2b1f0e0da539800de1b9" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activity_items" ADD CONSTRAINT "FK_5aa65133f98bd55c4303a52066d" FOREIGN KEY ("priceId") REFERENCES "prices"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activity_items" ADD CONSTRAINT "FK_6345f63ba2e3f0592c0bb9f50c3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_737991e10350d9626f592894cef" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "settings" ADD CONSTRAINT "FK_9175e059b0a720536f7726a88c7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vats" ADD CONSTRAINT "FK_df60c14452cfae6d2216f1400e0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "utility_expenses" ADD CONSTRAINT "FK_3c24a9ade94ca3c1623c667a3c6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contingency_expenses" ADD CONSTRAINT "FK_1b6d582c136363fc6f09cf309ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "admin_expenses" ADD CONSTRAINT "FK_3ea02a0d55b8adbb52f7e5460e7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_expenses" DROP CONSTRAINT "FK_3ea02a0d55b8adbb52f7e5460e7"`);
        await queryRunner.query(`ALTER TABLE "contingency_expenses" DROP CONSTRAINT "FK_1b6d582c136363fc6f09cf309ad"`);
        await queryRunner.query(`ALTER TABLE "utility_expenses" DROP CONSTRAINT "FK_3c24a9ade94ca3c1623c667a3c6"`);
        await queryRunner.query(`ALTER TABLE "vats" DROP CONSTRAINT "FK_df60c14452cfae6d2216f1400e0"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP CONSTRAINT "FK_9175e059b0a720536f7726a88c7"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_737991e10350d9626f592894cef"`);
        await queryRunner.query(`ALTER TABLE "activity_items" DROP CONSTRAINT "FK_6345f63ba2e3f0592c0bb9f50c3"`);
        await queryRunner.query(`ALTER TABLE "activity_items" DROP CONSTRAINT "FK_5aa65133f98bd55c4303a52066d"`);
        await queryRunner.query(`ALTER TABLE "activity_items" DROP CONSTRAINT "FK_8fa5aeb2b1f0e0da539800de1b9"`);
        await queryRunner.query(`ALTER TABLE "activity_items" DROP CONSTRAINT "FK_baae3b878405ac579a12d804e0e"`);
        await queryRunner.query(`ALTER TABLE "activity_items" DROP CONSTRAINT "FK_5348a562a32bd260b7cc95e5591"`);
        await queryRunner.query(`ALTER TABLE "prices" DROP CONSTRAINT "FK_788cf5bee8c7803724520878089"`);
        await queryRunner.query(`ALTER TABLE "providers" DROP CONSTRAINT "FK_4b0d0c4263e4deeadb572481319"`);
        await queryRunner.query(`ALTER TABLE "providers" DROP CONSTRAINT "FK_b0a257f97e76b698c4935b27d7d"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_7fc85a35416284146d732986c6f"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_6ce5806182de665bd49dadad4c3"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_03339c5eda13c64f273a1b848ec"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_0650b2d6b04b496edfed1c3b910"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_091f9433895a53408cb8ae3864f"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_59c1e5e51addd6ebebf76230b37"`);
        await queryRunner.query(`ALTER TABLE "provider_items" DROP CONSTRAINT "FK_e5d564c80f7df03dede5943a931"`);
        await queryRunner.query(`ALTER TABLE "provider_items" DROP CONSTRAINT "FK_1219901b88cc8f4deb19d12d24b"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5a2cfe6f705df945b20c1b22c71"`);
        await queryRunner.query(`ALTER TABLE "service_items" DROP CONSTRAINT "FK_828023f0b3eb110017a20dbbc35"`);
        await queryRunner.query(`ALTER TABLE "service_items" DROP CONSTRAINT "FK_2ffd8c1397bab6ef81d27409884"`);
        await queryRunner.query(`ALTER TABLE "service_items" DROP CONSTRAINT "FK_96dc4e3108ef91b79bb9fa36293"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_3905389899d96c4f1b3619f68d5"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_dc4034c116fe114758992e11c58"`);
        await queryRunner.query(`ALTER TABLE "service_categories" DROP CONSTRAINT "FK_3914911d12818d49a61374962f3"`);

        await queryRunner.query(`DROP TABLE "admin_expenses"`);
        await queryRunner.query(`DROP TABLE "contingency_expenses"`);
        await queryRunner.query(`DROP TABLE "utility_expenses"`);
        await queryRunner.query(`DROP TABLE "vats"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "activity_items"`);
        await queryRunner.query(`DROP TABLE "prices"`);
        await queryRunner.query(`DROP TABLE "providers"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "branches"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "provider_items"`);
        await queryRunner.query(`DROP TABLE "activities"`);
        await queryRunner.query(`DROP TABLE "service_items"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "service_categories"`);
    }

}
