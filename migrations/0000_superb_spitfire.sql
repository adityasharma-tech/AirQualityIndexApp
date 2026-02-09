CREATE TABLE "data" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "data_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"lat" bigint NOT NULL,
	"lng" bigint NOT NULL,
	"altitude" integer NOT NULL,
	"timestamp" timestamp DEFAULT now(),
	"humidity" integer NOT NULL,
	"temperature" integer NOT NULL,
	"co" integer NOT NULL,
	"co2" integer NOT NULL
);
