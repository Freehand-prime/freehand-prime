const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const pool = require('./modules/pool');

// Route includes
const userRouter = require("./routes/user.router");
const eventsRouter = require("./routes/events.router");
const personsRouter = require("./routes/persons.router");
const cardsRouter = require("./routes/cards.router");
const categoriesRouter = require("./routes/categories.router");
const occasionsRouter = require("./routes/occasions.router");
const adminRouter = require("./routes/admin.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/event", eventsRouter);
app.use("/api/persons", personsRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/occasions", occasionsRouter);
app.use("/api/admin", adminRouter);

// S3
app.use(
  "/s3",
  require("react-dropzone-s3-uploader/s3router")({
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_S3_REGION,
    headers: { "Access-Control-Allow-Origin": "*" },
    ACL: "public-read",
  })
);

// nodemailer
app.post("/send", function (req, res, next) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `${process.env.GMAIL_ADDRESS}`,
    to: `${req.body.email}`,
    subject: `${req.body.subject}`,
    text: `${req.body.message}`,
    replyTo: `${process.env.GMAIL_ADDRESS}`,
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.error("there was an error: ", err);
      res.sendStatus(500)
    } else {
      console.log("here is the res: ", res);
      res.sendStatus(200)
    }
  });
});

//node cron
/*cron to schedule function run at midnight every day
	function to check dates
		parse the events
		DATA:
			SELECT "persons".name, "events".date, "events".id, "user".username FROM "events"
      JOIN "persons" ON "persons".id = "events".person_id 
      JOIN "user" ON "user".id = "persons".user_id;
      

		handling logic:
		map over events =>
			check the event.date
			if current.date +14 === event.date =>
				send email
					email contains link to pick card*/

  //check dates everyday at midnight
cron.schedule('0 0 * * *', () => {
  console.log('midnight queries');

  //get data from database "persons".name, "events".date, "events".id, "user".username
  const eventQuery = `
  SELECT "persons".name, "events".date, "events".id, "user".username FROM "events"
  JOIN "persons" ON "persons".id = "events".person_id 
  JOIN "user" ON "user".id = "persons".user_id;
  `;

  pool
      .query(eventQuery)
      .then((result) => {
        //map over the result rows to check dates
        result.rows;
      })
      .catch((error) => {
          console.error(error);
          //send response 500 'Internal Server Error' on pool query error
          //todo: how to handle error outside of an express function?
      });
});

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
