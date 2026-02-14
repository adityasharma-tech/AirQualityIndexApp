ALTER TABLE "data" ALTER COLUMN "lat" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "lng" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "altitude" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "timestamp" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "timestamp" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "humidity" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "temperature" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "co" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "co2" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "pressure" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "data" ALTER COLUMN "bmpAltitude" SET DATA TYPE double precision;