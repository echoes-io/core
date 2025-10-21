import type { Kysely } from 'kysely';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { createDatabase } from '../../lib/db/client';
import { down, up } from '../../lib/db/migrations';
import type { Database } from '../../lib/models';

describe('Database Migrations', () => {
  let db: Kysely<Database>;

  beforeEach(async () => {
    db = createDatabase({ filename: ':memory:' });
    await up(db);
  });

  afterEach(async () => {
    await db.destroy();
  });

  it('creates all tables', async () => {
    const tables = await db.introspection.getTables();
    const tableNames = tables.map((t) => t.name).sort();

    expect(tableNames).toEqual(['arcs', 'chapters', 'episodes', 'parts', 'povs', 'timelines']);
  });

  it('creates timeline with name as PK', async () => {
    const result = await db
      .insertInto('timelines')
      .values({
        name: 'eros',
        description: 'Test Timeline',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    expect(result.name).toBe('eros');
    expect(result.description).toBe('Test Timeline');
  });

  it('creates arc with composite PK', async () => {
    await db
      .insertInto('timelines')
      .values({
        name: 'eros',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .execute();

    const result = await db
      .insertInto('arcs')
      .values({
        timelineId: 'eros',
        name: 'Arc 1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    expect(result.timelineId).toBe('eros');
    expect(result.name).toBe('Arc 1');
  });

  it('enforces foreign key constraints', async () => {
    await expect(
      db
        .insertInto('arcs')
        .values({
          timelineId: 'nonexistent',
          name: 'Test Arc',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .execute(),
    ).rejects.toThrow();
  });

  it('cascades deletes', async () => {
    await db
      .insertInto('timelines')
      .values({
        name: 'eros',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .execute();

    await db
      .insertInto('arcs')
      .values({
        timelineId: 'eros',
        name: 'Arc 1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .execute();

    await db.deleteFrom('timelines').where('name', '=', 'eros').execute();

    const arcs = await db.selectFrom('arcs').selectAll().execute();
    expect(arcs).toHaveLength(0);
  });

  it('can rollback migrations', async () => {
    await down(db);
    const tables = await db.introspection.getTables();
    expect(tables).toHaveLength(0);
  });
});
