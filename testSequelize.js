const db = require("./models");

db.sequelize.authenticate()
  .then(() => {
    console.log("Conectado a la base de datos ✅");
  })
  .catch(error => {
    console.error("Error de conexión ❌", error);
  });
