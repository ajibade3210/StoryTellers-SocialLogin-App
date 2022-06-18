### STORYTELLER APP.

An application for sharing lastest files and stories. Create public and private stories from trends and hot gists.
The Application is mainly focused on Security, Authentication and Authorization Using Node Js, OAuth, Passport.js, Hamlet, Https and other dependencies.

### Routes

// @desc Dashboard
// @route GET /dashboard

- home routes `/`
- auth routes `/auth`
- stories routes `/stories`

### Using Handlebars

Using Handlebars for Client Side View.

```
app.engine(".hbs", engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");
```
Create a views/layout folder.

### layout:
Layout folder houses the main file. But when rendering we render directly to our file of choice using fileName.
And introduce them to the main.hbs layout using `{{{body}}}`.

The Layout Only Act as a template.

### Styles
- public/styles.css
- materialize
- font-awesome

### Create Project In Google Console.
- Create Project In Google Console.
- Setting the OAuth Content Screen.
- Fetch Generated Client_Id and CLient_Secret.

Get Client_Id and CLient_Secret

### Using Passport.js
Fetches Data Using Strategy Secret And Id.
- `passport.use(new Strategy(), (accessToken, refreshToken, profile, done)=>{})`

Accepts User From passport middleware above and Send Data to `deserializeUser` and `req`.
- `passport.serializeUser((user, done)=> {done(null, user._id)}`

Accepts id From passport.serializeUser
- `passport.deserializeUser((id, done) => {`

### Create Auth Middleware.
Using `isAuthenticated` from passport saved in the req

`req.isAuthenticated()`

### Store Session in MongoStore

```
 store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "storytellers",
    }),
```


