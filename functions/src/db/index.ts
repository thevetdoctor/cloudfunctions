// Import/require dependencies
import { ForeignKey, Sequelize } from 'sequelize-typescript';
import dbconfig from "../dbconfig";
import { userModel } from './models/userModel';
import { productModel } from './models/productModel';
import { imageModel } from './models/imageModel';
import { postModel } from './models/postModel';

// Destructure database configuration variables from 'dbconfig' module
const {
  DB_NAME,
  DB_USERNAME,
  DB_PASS,
  DB_HOST,
} = dbconfig;

// Initialize new database connection
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

// Declare database models
const User = connection.define('user', userModel);
const Product = connection.define('product', productModel);
const Image = connection.define('image', imageModel);
const Post = connection.define('post', postModel);

// Relationships
User.hasMany(Product);
Product.belongsTo(User);
User.hasMany(Post);
Post.belongsTo(User);
Product.hasMany(Image);
Image.belongsTo(Product, {
  foreignKey: 'productId'
});

// connection.sync({ alter: true }).then(() => console.log("DB refreshed"));

// Initialize database connecttion
connection.authenticate()
  .then(() => {
    console.log('Connection to database establised');
  })
  .catch((err: any) => {
    console.error('Unable to connect to database:');
  });

export default connection;
