import * as t from "drizzle-orm/pg-core";
import { db } from ".";

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