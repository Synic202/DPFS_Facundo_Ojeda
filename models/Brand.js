module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define("Brand", {
    name: DataTypes.STRING
  }, {
    tableName: "brands",
    timestamps: false
  });

  Brand.associate = function (models) {
    Brand.hasMany(models.Product, {
      as: "products",
      foreignKey: "brand_id"
    });
  };

  return Brand;
};


