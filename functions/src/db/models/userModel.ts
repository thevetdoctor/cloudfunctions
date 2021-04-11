// Import/require dependencies
const Sequelizee = require("sequelize");

// Declare model
export const userModel = {
  firstName: {
    type: Sequelizee.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelizee.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelizee.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  uid: {
    type: Sequelizee.STRING,
    allowNull: false,
  },
  mobile: {
    type: Sequelizee.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelizee.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelizee.STRING,
    defaultValue: "basic",
  },
  birthday: {
    type: Sequelizee.DATE,
    allowNull: true,
  },
  profileImage: {
    type: Sequelizee.STRING,
    allowNull: true,
  },
};
