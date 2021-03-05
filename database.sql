-- database name "freehand"

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"isadmin" BOOLEAN NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "events" (
	"id" serial NOT NULL,
	"person_id" int NOT NULL,
	"category_id" int NOT NULL,
	"occasion_id" int NOT NULL,
	"card_id" int,
	"date" DATE NOT NULL,
	"inscription" varchar(1000) NOT NULL,
	"is_shipped" BOOLEAN NOT NULL,
	"ship_to_me" BOOLEAN NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "occasions" (
	"id" serial NOT NULL,
	"occasion" varchar(255) NOT NULL,
	CONSTRAINT "occasions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"category" varchar(255) NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "cards" (
	"id" serial NOT NULL,
	"occasion_id" int NOT NULL,
	"category_id" int NOT NULL,
	"image_front" varchar(1000) NOT NULL,
	"image_inside" varchar(1000) NOT NULL,
	"likes" int NOT NULL,
	"artist" varchar(255) NOT NULL,
	"details" varchar(1000) NOT NULL,
	CONSTRAINT "cards_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "persons" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	"relationship" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	CONSTRAINT "persons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("person_id") REFERENCES "persons"("id");
ALTER TABLE "events" ADD CONSTRAINT "events_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");
ALTER TABLE "events" ADD CONSTRAINT "events_fk2" FOREIGN KEY ("occasion_id") REFERENCES "occasions"("id");
ALTER TABLE "events" ADD CONSTRAINT "events_fk3" FOREIGN KEY ("card_id") REFERENCES "cards"("id");

ALTER TABLE "cards" ADD CONSTRAINT "cards_fk0" FOREIGN KEY ("occasion_id") REFERENCES "occasions"("id");
ALTER TABLE "cards" ADD CONSTRAINT "cards_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");

ALTER TABLE "persons" ADD CONSTRAINT "persons_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
