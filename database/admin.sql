--fixed
INSERT INTO "cards" (
        'occasion_id', 
        'category_id', 
        'image_front', 
        'image_inside',  
        'artist', 
        'details') = (
    https://freehand-prime.s3.us-east-2.amazonaws.com/card1front.jpeg,
    https://freehand-prime.s3.us-east-2.amazonaws.com/card1inside.jpeg,
    4,
    8,
    Test,
    Test);
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