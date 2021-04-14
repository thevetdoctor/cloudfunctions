// Import/require dependencies
const Sequelizee = require("sequelize");

// Declare model
export const imageModel = {
  name: {
    type: Sequelizee.STRING,
    allowNull: false,
    // unique: true
  },
  description: {
    type: Sequelizee.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelizee.STRING,
    defaultValue: "basic",
  },
  productId: {
    type: Sequelizee.INTEGER,
    allowNull: false,
  },
  url: {
    type: Sequelizee.STRING,
    allowNull: false,
  },
  likes: {
    type: Sequelizee.INTEGER,
    allowNull: false,
  },
};
