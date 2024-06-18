const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const Product = require('./models/productSchema');
const Brand = require('./models/brandSchema');
const Category = require('./models/categorySchema');

const indexRouter = require('./routes/index');
const shopRouter = require('./routes/shop');

const app = express();

//setup mongoose conenction
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const sidebarData = await Promise.all([
    Product.find({}, 'name').sort({ name: 1 }).limit(10).exec(),
    Brand.find({}, 'name').sort({ name: 1 }).exec(),
    Category.find({}, 'name').sort({ name: 1 }).exec(),
  ]);

  res.locals.sidebarData = sidebarData;
  next();
});

app.use('/', indexRouter);
app.use('/shop', shopRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: `${err.status} ${err.message}` });
});

module.exports = app;
