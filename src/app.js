const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "miSecreto123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


const usersRoutes = require("./routes/users.routes");
app.use("/users", usersRoutes);

const productsRoutes = require("./routes/products.routes");
app.use("/products", productsRoutes);


const apiUsersRoutes = require("./routes/API/users.routes");
app.use("/api/users", apiUsersRoutes);

const apiProductsRoutes = require("./routes/API/products.routes");
app.use("/api/products", apiProductsRoutes);


app.get("/", (req, res) => res.render("home"));


app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
