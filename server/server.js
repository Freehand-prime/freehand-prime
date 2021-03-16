const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const eventsRouter = require('./routes/events.router');
const personsRouter = require('./routes/persons.router');
const cardsRouter = require('./routes/cards.router');
const categoriesRouter = require('./routes/categories.router');
const occasionsRouter = require('./routes/occasions.router');
const adminRouter = require('./routes/admin.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/event', eventsRouter);
app.use('/api/persons', personsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/occasions', occasionsRouter);
app.use('/api/admin', adminRouter);

// S3
app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
  bucket: process.env.AWS_S3_BUCKET,
  region: process.env.AWS_S3_REGION,
  headers: {'Access-Control-Allow-Origin': '*'}, 
  ACL: 'public-read',                                 
}));

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
