let {app,passport} = require('./configs/server');
const Seeds = require('./seeds');

//Seeds(); //seed the db
// let passport = require('./configs/server')(app).passport;
const commentsRoutes = require('./configs/routes/comments');
const indexRoutes = require('./configs/routes/index');
const campRoutes = require('./configs/routes/routes');
const authRoutes = require('./configs/routes/auth');

app.use(indexRoutes);
app.use("/campgrounds",campRoutes);
app.use('/campgrounds/:id/comments',commentsRoutes);
app.use(authRoutes);
app.listen(3000,()=>{
    console.log('server started at port 3000');
});