const { Product, Category } = require("../../../models");

const productsAPIController = {

  list: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      const { count, rows: products } = await Product.findAndCountAll({
        include: [{ model: Category, as: "categories", attributes: ["id", "name"] }],
        limit,
        offset
      });

      const totalPages = Math.ceil(count / limit);

      // Contar por categoría
      const countByCategory = {};
      products.forEach(prod => {
        prod.categories.forEach(cat => {
          countByCategory[cat.name] = (countByCategory[cat.name] || 0) + 1;
        });
      });

      res.json({
        count,
        totalPages,
        next: page < totalPages ? `/api/products?page=${page + 1}` : null,
        previous: page > 1 ? `/api/products?page=${page - 1}` : null,
        countByCategory,
        products: products.map(prod => ({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          categories: prod.categories.map(cat => ({ id: cat.id, name: cat.name })),
          detail: `/api/products/${prod.id}`
        }))
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching products" });
    }
  },

  detail: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { model: Category, as: "categories", attributes: ["id", "name"] }
        ]
      });

      if (!product) return res.status(404).json({ error: "Product not found" });

      res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        categories: product.categories.map(cat => ({ id: cat.id, name: cat.name })),
        image: product.image
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching product" });
    }
  }

};

module.exports = productsAPIController;
