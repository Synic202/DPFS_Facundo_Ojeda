const fs = require("fs");
const path = require("path");
const db = require("../../models");
const { Product, Category, Brand } = db;

const productsFilePath = path.join(__dirname, "../data/products.json");

const productsController = {
  

  list: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          { model: Category, as: "category" },
          { model: Brand, as: "brand" }
        ]
      });

      res.render("products/list", { products });
    } catch (error) {
      console.error(error);
      res.send("Error al listar productos");
    }
  },

 
  detail: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { model: Category, as: "category" },
          { model: Brand, as: "brand" }
        ]
      });

      res.render("products/detail", { product });
    } catch (error) {
      console.error(error);
      res.send("Error al mostrar el producto");
    }
  },


  createForm: async (req, res) => {
    try {
      const categories = await Category.findAll();
      const brands = await Brand.findAll();

      res.render("products/create", { categories, brands });
    } catch (error) {
      console.error(error);
      res.send("Error al cargar el formulario");
    }
  },

  
  store: async (req, res) => {
    try {
      await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        brand_id: req.body.brand_id
      });

      res.redirect("/products");
    } catch (error) {
      console.error(error);
      res.send("Error al crear el producto");
    }
  },

  
  editForm: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      const categories = await Category.findAll();
      const brands = await Brand.findAll();

      res.render("products/edit", {
        product,
        categories,
        brands
      });
    } catch (error) {
      console.error(error);
      res.send("Error al editar el producto");
    }
  },

  
  update: async (req, res) => {
    try {
      await Product.update(
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          category_id: req.body.category_id,
          brand_id: req.body.brand_id
        },
        {
          where: { id: req.params.id }
        }
      );

      res.redirect("/products/" + req.params.id);
    } catch (error) {
      console.error(error);
      res.send("Error al actualizar el producto");
    }
  },

  
  destroy: async (req, res) => {
    try {
      await Product.destroy({
        where: { id: req.params.id }
      });

      res.redirect("/products");
    } catch (error) {
      console.error(error);
      res.send("Error al eliminar el producto");
    }
  }
};

module.exports = {
  list: async (req, res) => {
    const products = await Product.findAll({
      include: ['category', 'brand']
    });

    res.render('products/list', { products });
  },

  detail: async (req, res) => {
  const product = await db.Product.findByPk(req.params.id, {
    include: ['category', 'brand']
  });

  res.render('products/detail', { product });
},

createForm: async (req, res) => {
  const categories = await db.Category.findAll();
  const brands = await db.Brand.findAll();

  res.render('products/create', { categories, brands });
},

store: async (req, res) => {
  await db.Product.create({
    name: req.body.name,
    price: req.body.price,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id
  });

  res.redirect('/products');
},

editForm: async (req, res) => {
  const product = await db.Product.findByPk(req.params.id);
  const categories = await db.Category.findAll();
  const brands = await db.Brand.findAll();

  res.render('products/edit', { product, categories, brands });
},

update: async (req, res) => {
  await db.Product.update({
    name: req.body.name,
    price: req.body.price,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id
  }, {
    where: { id: req.params.id }
  });

  res.redirect('/products');
},

destroy: async (req, res) => {
  await db.Product.destroy({
    where: { id: req.params.id }
  });

  res.redirect('/products');
}




};
module.exports = productsController;



