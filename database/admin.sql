--fixed
INSERT INTO "cards" (
        "occasion_id", 
        "category_id", 
        "image_front", 
        "image_inside",  
        "artist", 
        "details") 
VALUES (
    4,
    8,
	'https://freehand-prime.s3.us-east-2.amazonaws.com/card1front.jpeg',
    'https://freehand-prime.s3.us-east-2.amazonaws.com/card1inside.jpeg',
    'Test',
    'Test');

DELETE * FROM "cards"
WHERE id = x;

--CREATE TABLE "user" (
--	"id" serial NOT NULL,
--	"username" varchar(255) NOT NULL UNIQUE,
--	"password" varchar(1000) NOT NULL,
--	"isadmin" BOOLEAN DEFAULT FALSE NOT NULL,
--	CONSTRAINT "user_pk" PRIMARY KEY ("id")
--) WITH (
--  OIDS=FALSE
--);

-- DROP TABLE "user" CASCADE;
-- DROP TABLE "categories" CASCADE;
-- DROP TABLE "occasions" CASCADE;
-- DROP TABLE "cards" CASCADE;
-- DROP TABLE "persons" CASCADE;
-- DROP TABLE "events" CASCADE;

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

CREATE TABLE "events" (
	"id" serial NOT NULL,
	"person_id" int NOT NULL,
	"category_id" INT DEFAULT 1 REFERENCES "categories" ON DELETE SET DEFAULT,
	"occasion_id" INT DEFAULT 1 REFERENCES "occasions" ON DELETE SET DEFAULT,
	"card_id" int,
	"date" DATE NOT NULL,
	"inscription" varchar(1000),
	"is_shipped" BOOLEAN DEFAULT FALSE NOT NULL,
	"ship_to_me" BOOLEAN DEFAULT FALSE NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "persons" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	"relationship" varchar(255) NOT NULL,
	"address" varchar(255),
	CONSTRAINT "persons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "cards" (
	"id" serial NOT NULL,
	"occasion_id" INT DEFAULT 1 REFERENCES "occasions" ON DELETE SET DEFAULT,
	"category_id" INT DEFAULT 1 REFERENCES "categories" ON DELETE SET DEFAULT,
	"image_front" varchar(1000) NOT NULL,
	"image_inside" varchar(1000) NOT NULL,
	"likes" int DEFAULT 0 NOT NULL,
	"artist" varchar(255) NOT NULL,
	"details" varchar(1000) NOT NULL,
	CONSTRAINT "cards_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "events" ADD CONSTRAINT "events_fk3" FOREIGN KEY ("card_id") REFERENCES "cards"("id");
ALTER TABLE "persons" ADD CONSTRAINT "persons_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("person_id") REFERENCES "persons"("id");

INSERT INTO "occasions" ("occasion")
VALUES ('Not Specified'),
('Anniversary'),
('Birthday'),
('Christmas'),
('Graduation'),
('Chanukkah'),
('Kwanzaa'),
('Ramadan'),
('Just Because'),
('Valentines Day'),
('Fathers Day'),
('Mothers Day'),
('New Baby'),
('Sympathy');

INSERT INTO "categories" ("category")
VALUES ('Not Specified'), ('Funny'), ('Inspirational'), ('Romantic'), ('Heartfelt'), ('Scenic'), ('Poetic'), 
('Religious'), ('Pop Culture'), ('Fantasy');

INSERT INTO "persons" ("user_id", "name", "relationship")
VALUES (1, 'Brendan Eich', 'Father'),
(1, 'Yan Zhu', 'Mother'),
(1, 'Sophie Alpert', 'Partner'),
(1, 'Dan Abramov', 'Brother');

INSERT INTO "events" ("person_id", "category_id", "occasion_id", "date")
VALUES (1, 2, 11, '06/20/2021'),
(2, 3, 12, '05/09/2021'),
(2, 5, 10, '02/14/2022'),
(3, 4, 10, '02/14/2022'),
(1, 2, 3, '07/04/2021'),
(4, 2, 9, '06/02/2021');

INSERT INTO "cards" ("occasion_id", "category_id", "image_front", "image_inside", "artist", "details")
VALUES (9, 6, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card1front.jpeg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card1inside.jpeg', 'Wanda Maximoff', 'Pictoral scene that stresses solitude and taking time'),
(2, 5, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card2front.jpeg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card2inside.jpeg', 'Monica Rambeau', 'Sweet Fox, but you are wiser'),
(10, 3, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card3front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card3inside.png', 'Thor Odinson', 'Setting off on an adventure with you on a Viking ship'),
(9, 7, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card4front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card4inside.png', 'Darcy Lewis', 'Girl on a boat, dreaming'),
(2, 4, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card5front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card5inside.png', 'Clint Barton', 'Couple on a beach during sunset expressing togetherness'),
(5, 3, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card6front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card6inside.png', 'Natasha Romanoff', 'Girl stretching for a fight, dedicated and focused'),
(12, 5, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card7front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card7inside.png', 'Anthony Stark', 'Mother and children'),
(10, 5, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card8front.jpeg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card8inside.png', 'Pepper Potts', 'Elegant women in dresses'),
(10, 10, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card9front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card9inside.jpg', 'Carol Danvers', 'Superhero woman wants some quality time');

INSERT INTO "cards" ("occasion_id", "category_id", "image_front", "image_inside", "artist", "details")
VALUES (3, 10, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card10front.jpeg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card10inside.jpeg', 'Ford Prefect', 'Two aliens celebrating your birthday'),
(10, 9, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card11front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card11inside.jpg', 'Tess Truehart', 'Pop Art woman with something special on her mind'),
(2, 6, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card12front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card12inside.png', 'Arthur Dent', 'Woman at a scenic beach'),
(10, 10, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card13front.jpeg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card13inside.jpeg', 'Sam Spade', 'Noir Valentine'),
(9, 5, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card14front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card14inside.jpg', 'Selina Kyle', 'Magic ballerina'),
(9, 10, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card15front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card15inside.jpg', 'Ariel Sebastian', 'Mermaid spa day'),
(10, 4, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card16front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card16inside.jpg', 'Phillip Marlow', 'Couple with an umbrella in love'),
(9, 6, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card17front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card17inside.jpg', 'James Hewlitt', 'Cactus, just because'),
(14, 5, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card18front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card18inside.jpg', 'James Rhodes', 'Soldier in the forest, not alone in battle'),
(9, 3, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card19front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card19inside.jpg', 'Patricia Ives', 'Plant, simplicity essential for growth'),
(9, 8, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card20front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card20inside.jpg', 'Alison Blaire', 'Woman holding light'),
(2, 4, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card21front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card21inside.jpg', 'Penny Lane', 'Blue flower, happy anniversary'),
(9, 8, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card22front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card22inside.jpg', 'Irwin Fletcher', 'Praying exhudes radiance'),
(7, 6, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card23front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card243nside.jpg', 'Linus Van Pelt', 'Happy Thanksgiving'),
(12, 6, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card24front.jpeg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card24inside.jpg', 'Lucy Van Pelt', 'So many plants for Mothers Day'),
(10, 2, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card25front.jpeg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card25inside.jpg', 'Tim Taylor', 'Man with beer'),
(5, 2, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card26front.jpeg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card26inside.jpg', 'Parker Lewis', 'Cheering section'),
(5, 10, 'https://freehand-prime.s3.us-east-2.amazonaws.com/card27front.jpg', 'https://freehand-prime.s3.us-east-2.amazonaws.com/card27inside.jpg', 'Leonard McCoy', 'Live Long and Prosper');
