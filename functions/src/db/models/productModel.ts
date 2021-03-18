// Import/require dependencies
const Sequelizee = require('sequelize');

// Declare model
 export const productModel = {
    name: {
      type: Sequelizee.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelizee.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelizee.STRING,
      defaultValue: 'basic'
    },  
    userId: {
      type: Sequelizee.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelizee.INTEGER,
      allowNull: true,
    },
    likes: {
      type: Sequelizee.INTEGER,
      allowNull: true,
    }
  }