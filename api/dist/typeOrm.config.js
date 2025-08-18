"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormModuleOptions = void 0;
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const path_1 = require("path");
(0, dotenv_1.config)({
    path: '.env',
});
const isProduction = process.env.NODE_ENV === 'production';
exports.typeormModuleOptions = isProduction
    ? {
        type: 'postgres',
        url: process.env.DB_URL,
        entities: [(0, path_1.join)(__dirname, 'src/**/*.entity{.ts,.js}')],
        migrations: [(0, path_1.join)(__dirname, 'migrations/*{.ts,.js}')],
    }
    : {
        type: 'sqlite',
        database: process.env.DB_URL,
        entities: [(0, path_1.join)(__dirname, 'src/**/*.entity{.ts,.js}')],
        migrations: [(0, path_1.join)(__dirname, 'migrations/*{.ts,.js}')],
        synchronize: false,
    };
const options = Object.assign(Object.assign({}, exports.typeormModuleOptions), { logging: !isProduction, migrationsTableName: 'migrations' });
exports.default = new typeorm_1.DataSource(options);
//# sourceMappingURL=typeOrm.config.js.map