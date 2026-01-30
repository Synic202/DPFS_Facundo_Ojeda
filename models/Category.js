module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING
  }, {
    tableName: "categories",
    timestamps: false
  });

  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      as: "products",
      foreignKey: "category_id"
    });
  };

  return Category;
};

