module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    name: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    Description: {
      type: Sequelize.STRING(200),
    },
    Brand: {
      type: Sequelize.STRING(200),
    },
    Major_Use: {
      type: Sequelize.STRING(200),
    },
    Department: {
      type: Sequelize.STRING(200),
    },
  });

  return Tutorial;
};