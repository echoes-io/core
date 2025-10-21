import type { Kysely } from 'kysely';

import type { Database } from '../models';

export async function up(db: Kysely<Database>): Promise<void> {
  // Timelines
  await db.schema
    .createTable('timelines')
    .addColumn('name', 'text', (col) => col.primaryKey())
    .addColumn('description', 'text')
    .addColumn('created_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addColumn('updated_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .execute();

  // POVs
  await db.schema
    .createTable('povs')
    .addColumn('name', 'text', (col) => col.primaryKey())
    .addColumn('created_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addColumn('updated_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .execute();

  // Arcs
  await db.schema
    .createTable('arcs')
    .addColumn('timeline_id', 'text', (col) =>
      col.notNull().references('timelines.name').onDelete('cascade'),
    )
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('created_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addColumn('updated_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addPrimaryKeyConstraint('arcs_pk', ['timeline_id', 'name'])
    .execute();

  await db.schema.createIndex('arcs_timeline_id_idx').on('arcs').column('timeline_id').execute();

  // Episodes
  await db.schema
    .createTable('episodes')
    .addColumn('timeline_id', 'text', (col) =>
      col.notNull().references('timelines.name').onDelete('cascade'),
    )
    .addColumn('episode_index', 'integer', (col) => col.notNull())
    .addColumn('arc_id', 'text', (col) => col.notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('created_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addColumn('updated_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addPrimaryKeyConstraint('episodes_pk', ['timeline_id', 'episode_index'])
    .addForeignKeyConstraint(
      'episodes_arc_fk',
      ['timeline_id', 'arc_id'],
      'arcs',
      ['timeline_id', 'name'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createIndex('episodes_timeline_id_idx')
    .on('episodes')
    .column('timeline_id')
    .execute();

  await db.schema
    .createIndex('episodes_arc_idx')
    .on('episodes')
    .columns(['timeline_id', 'arc_id'])
    .execute();

  // Parts
  await db.schema
    .createTable('parts')
    .addColumn('timeline_id', 'text', (col) => col.notNull())
    .addColumn('episode_index', 'integer', (col) => col.notNull())
    .addColumn('part_index', 'integer', (col) => col.notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('created_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addColumn('updated_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addPrimaryKeyConstraint('parts_pk', ['timeline_id', 'episode_index', 'part_index'])
    .addForeignKeyConstraint(
      'parts_episode_fk',
      ['timeline_id', 'episode_index'],
      'episodes',
      ['timeline_id', 'episode_index'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createIndex('parts_episode_idx')
    .on('parts')
    .columns(['timeline_id', 'episode_index'])
    .execute();

  // Chapters
  await db.schema
    .createTable('chapters')
    .addColumn('timeline_id', 'text', (col) => col.notNull())
    .addColumn('arc_name', 'text', (col) => col.notNull())
    .addColumn('chapter_index', 'integer', (col) => col.notNull())
    .addColumn('pov', 'text', (col) => col.notNull().references('povs.name').onDelete('restrict'))
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('slug', 'text', (col) => col.notNull())
    .addColumn('content', 'text', (col) => col.notNull())
    .addColumn('word_count', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('created_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addColumn('updated_at', 'text', (col) => col.notNull().defaultTo("datetime('now')"))
    .addPrimaryKeyConstraint('chapters_pk', ['timeline_id', 'arc_name', 'chapter_index'])
    .addForeignKeyConstraint(
      'chapters_arc_fk',
      ['timeline_id', 'arc_name'],
      'arcs',
      ['timeline_id', 'name'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createIndex('chapters_arc_idx')
    .on('chapters')
    .columns(['timeline_id', 'arc_name'])
    .execute();

  await db.schema.createIndex('chapters_pov_idx').on('chapters').column('pov').execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('chapters').execute();
  await db.schema.dropTable('parts').execute();
  await db.schema.dropTable('episodes').execute();
  await db.schema.dropTable('arcs').execute();
  await db.schema.dropTable('povs').execute();
  await db.schema.dropTable('timelines').execute();
}
