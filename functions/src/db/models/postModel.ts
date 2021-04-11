// Import/require dependencies
const Sequelizee = require("sequelize");

// Declare model
export const postModel = {
  title: {
    type: Sequelizee.STRING,
    allowNull: false,
    unique: true
  },
  message: {
    type: Sequelizee.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelizee.STRING,
    defaultValue: "basic",
  },
  userId: {
    type: Sequelizee.INTEGER,
    allowNull: false,
  },
  likes: {
    type: Sequelizee.INTEGER,
    allowNull: false,
  },
};
