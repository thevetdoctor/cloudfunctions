// Import/require dependencies
import { ForeignKey, Sequelize } from "sequelize-typescript";
import dbconfig from "../dbconfig";
import { userModel } from "./models/userModel";
import { productModel } from "./models/productModel";
import { imageModel } from "./models/imageModel";
import { postModel } from "./models/postModel";
import { shoppingCartModel } from "./models/shoppingCartModel";
import { cartProductModel } from "./models/cartProductModel";
import { orderModel } from "./models/orderModel";
import { orderproductModel } from "./models/orderproductModel";


// Destructure database configuration variables from 'dbconfig' module
const { DB_NAME, DB_USERNAME, DB_PASS, DB_HOST } = dbconfig;

// Initialize new database connection
const connection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASS, {
  dialect: "postgres",
  host: DB_HOST,
  port: 5432,
  logging: false
},);

// Declare database models
const User = connection.define("user", userModel);
const Product = connection.define("product", productModel);
const ShoppingCart = connection.define("shoppingcart", shoppingCartModel);
const Image = connection.define("image", imageModel);
const Post = connection.define("post", postModel);
const cartProduct = connection.define('cartproduct', cartProductModel);
const Order = connection.define('order', orderModel);
const OrderProduct = connection.define('orderproduct', orderproductModel);

// Relationships
User.hasMany(Product);
Product.belongsTo(User);

User.hasOne(ShoppingCart);
ShoppingCart.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

ShoppingCart.hasMany(cartProduct, {
  as: 'cartproducts',
  foreignKey: "shoppingcartId",
});

cartProduct.belongsTo(ShoppingCart, {
  foreignKey: "shoppingcartId",
});

Product.hasMany(cartProduct, {
  as: 'cartproducts',
  foreignKey: "productId",
});

cartProduct.belongsTo(Product, {
  foreignKey: "productId",
});

Order.belongsToMany(Product, { 
  through: OrderProduct, 
  as: 'products',
  foreignKey: 'orderId',
  otherKey: 'productId' 
});

Product.belongsToMany(Order, { 
  through: OrderProduct, 
  as: 'orders',
  foreignKey: 'productId',
  otherKey: 'orderId'
});

Product.hasMany(Image);
Image.belongsTo(Product, {
  foreignKey: "productId",
});

// connection.sync({ force: true }).then((db) => {
// console.log("DB refreshed")
// });

// Initialize database connecttion
connection
  .authenticate()
  .then(() => {
    console.log("Connection to database establised");
  })
  .catch((err: any) => {
    console.error("Unable to connect to database:");
  });

export default connection;
