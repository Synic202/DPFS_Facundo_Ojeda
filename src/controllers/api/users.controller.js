const { User } = require("../../../models");

const usersAPIController = {

  // Listado de usuarios con paginado
  list: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      const { count, rows: users } = await User.findAndCountAll({
        attributes: ["id", "firstName", "lastName", "email"],
        limit,
        offset,
        order: [["id", "ASC"]]
      });

      const totalPages = Math.ceil(count / limit);

      res.json({
        count,
        totalPages,
        next: page < totalPages ? `/api/users?page=${page + 1}` : null,
        previous: page > 1 ? `/api/users?page=${page - 1}` : null,
        users: users.map(u => ({
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          email: u.email,
          detail: `/api/users/${u.id}`
        }))
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching users" });
    }
  },

  // Detalle de usuario
  detail: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "firstName", "lastName", "email", "image"]
      });

      if (!user) return res.status(404).json({ error: "User not found" });

      res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching user" });
    }
  }

};

module.exports = usersAPIController;
