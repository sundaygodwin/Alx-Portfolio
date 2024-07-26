if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}


const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path')
const ejsmate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');
const ExpressMongoSanitize = require('express-mongo-sanitize');



//support files
const User = require('./models/user');
const ExpressError = require('./utils/ExpressError');
const Features = require('./seeds/featureSeed')

// routes file
const profileRoute = require('./routes/profileRoute');
const projectRoute = require('./routes/projectRoute');
const taskRoute = require('./routes/taskRoute');
const userRoute = require('./routes/UserRoute')

//  Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/yelp-camp';
const dbUrl = process.env.DB_URL || mongoDB;
mongoose.connect(dbUrl);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", ()=>{
    console.log('Database connected')
});

//   call Express
const app = express();
//  Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride(('_method')));

//mongo injection
app.use(ExpressMongoSanitize());
// security
app.use(helmet());

// allowed source
const scriptSrcUrls = [
    "https://stackpath.bootsrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudfare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.jsdelivr.net/",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootsrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://use.fontawesome.com/",
    "https://fonts.googleapis.com/",
    "https://cdn.jsdelivr.net/",
    "https://getbootstrap.com/",
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com/"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com/",
];
const fontSrcUrls = [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com/",
];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", ...scriptSrcUrls],
            styleSrc: [ "'self'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'", 
                "blob:",
                "data:",
                "https://images.unsplash.com/",
                "https://res.cloudinary.com/ddkdhfgaq/",
                "https://media.istockphoto.com/",
                "http://www.w3.org/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            // Allow all sources to embed this site
            frameAncestors: ["*"],
        },
    })
);

const secret = process.env.SECRET || 'Bettersecret';
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret,
    }
});

// // Set up session middleware
const SessionConfig = {
    secret,
    store,
    resave: false,
    saveUninitialized: true,
    name: 'Alx-Portfolio',
    cookie:{
        httpOnly: true,
        //secure: true;
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
};
app.use(session(SessionConfig));
  
// // Set up flash middleware
app.use(flash());

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// express mongo sanitize
app.use(
    ExpressMongoSanitize({
      replaceWith: '_',
    }),
);
  
// Middleware to pass flash messages to views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// app.engine('ejs', ejsmate);
app.engine('ejs', ejsmate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//  ROUTES
app.get('/', async (req, res)=>{
    const features = Features;
    if(req.isAuthenticated()){
        const userProfile = await User.findById(req.user._id)
        res.render("home", { userProfile });
    }else{
        res.render("home", {features}); 
    }
});
// USER
app.use('/', userRoute)

// PROFILE
app.use('/myprofile', profileRoute)

// PROJECT
app.use('/myprofile', projectRoute);

//  TASK
app.use("/myprofile", taskRoute)


//SignOut
// app.delete("/myprofile/:id", async (req, res)=>{
//     const userProfile = await User.findByIdAndDelete(req.params.id);
//     res.redirect("/")
// })

//  error handler
app.all('*', (req, res, next)=>{
    next(new ExpressError('Page not found!', 404))
})

app.use((err, req, res, next)=>{
    const {statusCode = 500 } = err;
    if(!err.message) err.message = 'Something went wrong!!!!!!!!!!!!!!!';
    res.status(statusCode).render('error', { err });
})

app.listen(port, ()=>{
    console.log (`Site is running on port ${port}`)
})