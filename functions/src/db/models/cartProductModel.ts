// Import/require dependencies
const Sequelizee = require("sequelize");

// Declare model
export const cartProductModel = {
    userId: {
      type: Sequelizee.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelizee.INTEGER,
      allowNull: true,
    },
    status: {
      type: Sequelizee.STRING,
      defaultValue: "basic",
    },
};
