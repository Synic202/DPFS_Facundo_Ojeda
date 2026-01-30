const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersFilePath = path.join(__dirname, "../../data/users.json");

const getUsers = () => {
  const dirPath = path.dirname(usersFilePath); 

  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "[]", "utf-8");
  }

  try {
    return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  } catch (e) {
    console.error("Error leyendo users.json", e);
    return [];
  }
};


const usersController = {
  
  registerForm: (req, res) => res.render("users/register"),

  
  loginForm: (req, res) => res.render("users/login"),

  
  store: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        errors: errors.mapped(),
        oldData: req.body
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const users = getUsers();

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.render("users/register", {
        errors: { email: { msg: "El email ya está registrado" } },
        oldData: req.body
      });
    }

    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10)
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.redirect("/users/login");
  },

 
  login: (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render("users/login", { error: "Email o contraseña incorrectos" });
  }

  
  req.session.user = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  
  res.redirect("/products");
},

  

  
  profile: (req, res) => {
    if (!req.session.user) return res.redirect("/users/login");
    res.render("users/profile", { user: req.session.user });
  },

  
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) return res.send("No se pudo cerrar sesión");
      res.redirect("/");
    });
  }
};

module.exports = usersController;
