import knex from 'knex';
import { optionsKnex } from './configKnex';
import { logger } from '../utils/logger';
const db = knex(optionsKnex)

export const createTables = () => {

    db.schema.createTableIfNotExists("products", (table) => {
        table.increments("id").primary()
        table.string("timestamp")
        table.string("name")
        table.string("description")
        table.string("code")
        table.string("url")
        table.integer("price")
        table.integer("stock")
    })
    .then(function () {
        logger.info('Tabla de productos creada');
    });
    db.schema.createTableIfNotExists('cart', function(table) {
        table.increments('id').primary();
        table.string('productos').unsigned().references('id').inTable('products');
        table.string("timestamp")
    })
    .then(function() {
        logger.info('Tabla de carritos creada');
    });

    db.schema.table('cart', function(table) {
        table.foreign('productos').references('id').inTable('products');
        }).then(function() {
        console.log('Relación establecida entre las tablas de productos y carritos');
});
}
