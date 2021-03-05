const Sequelizee = require('sequelize');
import { Sequelize } from 'sequelize-typescript';
// import _ from 'lodash';
// import Faker from 'faker';
import { config } from 'dotenv';
import dbconfig from "../dbconfig";

config();
const {
  DB_NAME,
  DB_USERNAME,
  DB_PASS,
  DB_HOST,
} = dbconfig;

// console.log('HOSTNAME', DB_HOST, dbconfig );

const connection = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASS,
  {
    dialect: 'postgres',
    host: DB_HOST,
    port: 5432,
  },
);

const User = connection.define('user', {
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
});

const Product = connection.define('product', {
  name: {
    type: Sequelizee.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelizee.STRING,
    allowNull: false,
  },
});

// Relationships
User.hasMany(Product);
Product.belongsTo(User);

// connection.sync({ force: true }).then(() => console.log("DB refreshed"));
// .then(() => {
//     _.times(10, () => {
//         return User.create({
//             firstName: Faker.name.firstName(),
//             lastName: Faker.name.lastName(),
//             email: Faker.internet.email()
//         })
//         .then(user => {
//             return user.createProduct({
//                 name: `Sample product for ${user.firstName}`,
//                 description: 'Description for product'
//             });
//         })
//     });
// });

connection.authenticate()
  .then(() => {
    console.log('Connection to database establised');
  })
  .catch((err: any) => {
    console.error('Unable to connect to database:');
  });

export default connection;
