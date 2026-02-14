import * as t from "drizzle-orm/pg-core";

export const dataTable = t.pgTable("data", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    lat: t.bigint({ mode: "bigint" }).notNull(),
    lng: t.bigint({ mode: "bigint" }).notNull(),
    altitude: t.integer().notNull(),
    timestamp: t.timestamp().defaultNow(),
    humidity: t.integer().notNull(),
    temperature: t.integer().notNull(),
    co: t.integer().notNull(),
    co2: t.integer().notNull(),
    pressure: t.integer().notNull(),
    bmpAltitude: t.integer().default(0)
})

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