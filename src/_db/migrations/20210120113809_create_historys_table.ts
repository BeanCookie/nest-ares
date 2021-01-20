import * as Knex from 'knex';
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('historys', function (table) {
    table.bigIncrements('id');
    table.string('day').index();
    table.string('date').index();
    table.string('title');
    table.string('e_id').index();
    timestamps(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('historys');
}
