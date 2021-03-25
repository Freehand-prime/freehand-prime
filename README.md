
# Freehand Cards

## Description

_Duration: 2 Week Sprint_

The Freehand Cards app is a service for busy people: people with bosses, employees, family and friends, who have Google calendars that quickly fill up with meetings, deadlines, school plays and doctor's appointments. It's an app for people who don't want to miss acknowledging important occasions for the people who they appreciate, but always seem to find themselves in the greeting card aisle at a drug store trying to find the best card from the available options. 

This app allows the user to create events for the people that are important to them, specifying the occasions they want to recognize and categories that fit the person & event that they want to celebrate. Freehand Cards will send the user an emailed reminder two weeks before the occasion and when the user follows the emailed link to the app, they are able to choose a card for their person that is curated for them. 

The app features a dashboard that highlights the next event that the user has recorded, a persons view to see all the people the user has entered into the app with all of their special occasions, the ability to edit any of these events, and a shuffle feature for the cards recommended to get different suggestions.

There are 2 Admin view pages, one to add new cards to the database and a second to add Categories and Occasions to the app, expanding the options for card selection/ management.

To see the fully functional site, please visit: [FREEHAND CARDS](https://freehand-cards.herokuapp.com/)

## Screen Shot

![Landing Page](documentation/images/Freehand-V1.png)
![Dashboard View](documentation/images/Freehand-V4.png)
![View Persons View](documentation/images/Freehand-V6.png)
![Pick a Card View](documentation/images/Freehand-V8.png)
![Admin Cards View](documentation/images/AdminCards.png)



## Prerequisites & Installation

1a. The project database is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. 

1b.We recommend using Postico to run those queries as that was used to create the queries, or pgAdmin if running postgres from a Windows PC. If running on Windows, you will need to enter your username and password for your postgres server in the .env file as described below.

1c. Create a local PostgreSQL database named `freehand`.

1d. The queries in the `database.sql` file are set up to create all the necessary tables. `cards.sql` `categories.sql` `Events.sql` `Occasions.sql` and `Persons.sql` populate the needed data to allow the application to run correctly.

1e. You may elevate accounts in "user" to administrators by setting the "isAdmin" flag to true. There is currently no in-app functionality to change this variable.

2. Open up your javascript IDE of choice and install Node and its current dependencies by running an `npm install` from your terminal. Refer to package.json for a list of dependencies.

3. You will need to set up a .env file with the following configuration settings. Note some of these settings are required for Heroku deployment only:

SERVER_SESSION_SECRET (Heroku deployment) A random secret string for passport.js module security.
    NOTE: ./server/constants/warnings.js will yell at you if your secret is < 8 characters or “superDuperSecret”.
DATABASE_URL (Heroku deployment) database URL to connect to live database on Heroku. You can find this link 
PG_USER – PostgreSQL username used in ./server/modules/pool.js module to connect to a LOCAL database.
PG_SECRET - PostgreSQL password used in ./server/modules/pool.js module to connect to a LOCAL database.
REACT_APP_S3_URL – Amazon AWS S3 bucket URL. Required for Dropzone S3 image upload.
AWS_ACCESS_KEY_ID – Amazon AWS S3 bucket Access Key ID. Required for Dropzone S3 image upload.
AWS_SECRET_ACCESS_KEY – Amazon AWS S3 bucket Secret Access Key. Required for Dropzone S3 image upload.
AWS_S3_BUCKET - Amazon AWS S3 bucket name. Required for Dropzone S3 image upload.
AWS_S3_REGION - Amazon AWS S3 region name. Required for Dropzone S3 image upload.
GMAIL_ADDRESS – Outgoing email account for Nodemailer integration.
GMAIL_PASS - Outgoing email account for Nodemailer integration.

4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you which should launch the client app at localhost:3000 and the server at localhost:5000.

## Usage

1. When the app opens, the user finds themselves at the landing page. There is a pleasant introduction to the purpose of the app and a button that says "Who do you appreciate?" The user presses the button. A returning user can press the hamburger menu and chose to log in and skip to Step 6.
2. The user is asked to enter the name of a person they appreciate and their relationship. (if the user is logged in, they will also see a Select menu of people they've already included in the app). The user presses continue.
3. The user will be asked to select an occasion that they would like to be reminded of and a date for that occasion. The user presses continue.
4. The user will be asked to select a category for that occasion, this will help in getting tailored card selections for the occasion later. The user presses continue.
5. The first time user is asked to register for the app with an email and a password, this will store the event in the user's profile as well as provide the email where the user will receive the reminder for the event. The logged in user's experience skips to the next step.
6. The user finds themselves at their dashboard. From here the user sees the next event that is coming up and buttons to add an additional event and a button to view their people. Adding an additional event follows the same path as the new user, entering the previously described info. Pressing view people continues with Step 7.
7. At View People, the user sees cards with all of the people that they have added to the app, with the name, relationship and number of events listed. Each card has a button to See Events.
8. Selecting See Events brings the user to another screen with cards listing the date, occasion, and category for each event with a button to Edit the Event.
9. Pressing Edit Event, the user is brought to a page where they will see a card (if one is selected), with a button that allows the user to select a new card. There are also fields to edit the person's name, occasion, date, and category, with the ability to change those fields. There are buttons to Delete the event, Update (save changes) the event, or Cancel the edit and go back. There is also a button for shipping (selecting Shipping skips to Step 11).
10. If a user is reminded of an event and they follow that link, they are brought to a page to select a card for the occasion. They are given 3 cards with suggested options for cards that include the image, artist, and a description of the card. Pressing on the image allows the user to see the inside of the card. Pressing on the button Choose This Card, selects the card and a Dialog pops up that asks the user to confirm that they want to select that card, or go back to select a card. If the user doesn't like the options presented, they can press the button See New Cards to shuffle and provide 3 new card options. Pressing Select this Card completes the process and advances the user to Shipping.
11. On the Shipping page, the user is provided with the details of the occasion and the selected card and is asked if everything looks correct. They are able to select a radio button for Ship to Me or Ship to Them. If Ship to Them is selected, a field appears to enter an address for the recipient of the card. There is also a field to enter an optional inscription for the card. If the user selects the Submit button, a Dialog pops up confirming that the card will be shipped to the recipient and be delivered by the event date. The user needs to choose Submit from the Dialog to complete the process and be returned to their Dashboard.
12. An admin has two pages, best viewable from Desktop. One page allows the user to upload new cards or edit existing cards. Card images are uploaded using Amazon Web Services and there are fields to enter the rest of the card info (occasion, category, artist name, and card description). The second Admin page allows the admin to add or delete occasions and categories to associate with cards in the inventory.


## Built With

React, Redux, Nodejs, Express, PostgreSql, Material-UI, Nodemailer, Node-Cron, AWS-Amazon Web Services, Passport

![Technologies Used](documentation/images/technologies-used.png)



## Acknowledgement
Thanks to our client, Paul Germo for allowing us to develop this app for him. We're excited to see where you take this idea next! We'd like to thank the instructors and staff at [Prime Digital Academy](https://www.primeacademy.io) who gave us the skills to develop this project, especially Dane Smith - we've grown into the coders that we are in your class. And thank you to our classmates in the Zhu Cohort for growing with us during the last 20 weeks!

![Dev Team](documentation/images/dev-team.png)

## Support
If you have questions, concerns or suggestions, feel free to contact any of the developers behind this project:
- [Mike Dunn](https://github.com/dunnmj42) -- dunnmj42@gmail.com
- [Nate MacLaurin](https://github.com/NateMacLaurin) -- nathan.w.maclaurin@gmail.com
- [Sean Wade](https://github.com/swadezy) -- smwade1115@gmail.com
- [Thomas Rohde](https://github.com/trohde13) -- rohde.t@gmail.com