module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER
  }, {
    tableName: "products",
    timestamps: false
  });

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "category",
      foreignKey: "category_id"
    });

    Product.belongsTo(models.Brand, {
      as: "brand",
      foreignKey: "brand_id"
    });
  };

  return Product;
};
