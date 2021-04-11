// Import/require dependencies
const Sequelizee = require("sequelize");

// Declare model
export const orderModel = {
  userId: {
    type: Sequelizee.INTEGER,
    allowNull: false,
  },
  totalValue: {
    type: Sequelizee.INTEGER,
    defaultValue: 0
  },
  status: {
    type: Sequelizee.STRING,
    defaultValue: "not paid",
  },
};
