import SQLite from 'better-sqlite3';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';

import type { Database } from '../models';

export interface CreateDatabaseOptions {
  filename: string;
  readonly?: boolean;
}

export function createDatabase(options: CreateDatabaseOptions): Kysely<Database> {
  const sqlite = new SQLite(options.filename, {
    readonly: options.readonly ?? false,
  });

  return new Kysely<Database>({
    dialect: new SqliteDialect({ database: sqlite }),
    plugins: [new CamelCasePlugin()],
  });
}
