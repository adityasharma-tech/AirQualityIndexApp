import * as t from "drizzle-orm/pg-core";

export const dataTable = t.pgTable("data", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),

  lat: t.doublePrecision().notNull(),
  lng: t.doublePrecision().notNull(),

  altitude: t.doublePrecision().notNull(),
  humidity: t.doublePrecision().notNull(),
  temperature: t.doublePrecision().notNull(),
  co: t.doublePrecision().notNull(),
  co2: t.doublePrecision().notNull(),
  pressure: t.doublePrecision().notNull(),
  bmpAltitude: t.doublePrecision().default(0),

  timestamp: t.timestamp({ withTimezone: true }).defaultNow(),
});

export interface DataTable {
  id: number;
  lat: number;
  lng: number;
  altitude: number;
  timestamp: Date;
  humidity: number;
  temperature: number;
  co: number;
  co2: number;
  pressure: number;
  bmpAltitude: number;
}
