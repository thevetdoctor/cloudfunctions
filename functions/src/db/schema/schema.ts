import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
} from "graphql";
import db from "../index";
import { errorName, errorType } from "../../helpers/constants";

const User = new GraphQLObjectType({
  name: "User",
  description: "This is a typical user",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(user) {
        return user.id;
      },
    },
    firstName: {
      type: GraphQLString,
      resolve(user) {
        return user.firstName;
      },
    },
    lastName: {
      type: GraphQLString,
      resolve(user) {
        return user.lastName;
      },
    },
    email: {
      type: GraphQLString,
      resolve(user) {
        return user.email;
      },
    },
    mobile: {
      type: GraphQLString,
      resolve(user) {
        return user.mobile;
      },
    },
    uid: {
      type: GraphQLString,
      resolve(user) {
        return user.uid;
      },
    },
    address: {
      type: GraphQLString,
      resolve(user) {
        return user.address;
      },
    },
    status: {
      type: GraphQLString,
      resolve(user) {
        return user.status;
      },
    },
    birthday: {
      type: GraphQLString,
      resolve(user) {
        return user.birthday;
      },
    },
    profileImage: {
      type: GraphQLString,
      resolve(user) {
        return user.profileImage;
      },
    },
    products: {
      type: new GraphQLList(Product),
      resolve(user) {
        return user.getProducts();
      },
    },
    shoppingcart: {
      type: new GraphQLList(ShoppingCart),
      resolve(user) {
        return user.getShoppingcarts();
      },
    },
    orders: {
      type: new GraphQLList(Order),
      resolve(user) {
        return user.getOrders();
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve(user) {
        return user.getPosts();
      },
    },
  }),
});

const Product = new GraphQLObjectType({
  name: "Product",
  description: "This is a typical product",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(product) {
        return product.id;
      },
    },
    name: {
      type: GraphQLString,
      resolve(product) {
        return product.name;
      },
    },
    description: {
      type: GraphQLString,
      resolve(product) {
        return product.description;
      },
    },
    status: {
      type: GraphQLString,
      resolve(product) {
        return product.status;
      },
    },
    userId: {
      type: GraphQLInt,
      resolve(product) {
        return product.userId;
      },
    },
    price: {
      type: GraphQLInt,
      resolve(product) {
        return product.price;
      },
    },
    likes: {
      type: GraphQLInt,
      resolve(product) {
        return product.likes;
      },
    },
    imageCollection: {
      type: new GraphQLList(Image),
      resolve(product) {
        return product.getImages();
      },
    },
    cartproducts: {
      type: new GraphQLList(Product),
      resolve(product) {
        return product.getCartproducts();
      },
    },
  }),
});

const Image = new GraphQLObjectType({
  name: "Image",
  description: "This is a typical image",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(image) {
        return image.id;
      },
    },
    name: {
      type: GraphQLString,
      resolve(image) {
        return image.name;
      },
    },
    description: {
      type: GraphQLString,
      resolve(image) {
        return image.description;
      },
    },
    status: {
      type: GraphQLString,
      resolve(image) {
        return image.status;
      },
    },
    productId: {
      type: GraphQLInt,
      resolve(image) {
        return image.productId;
      },
    },
    url: {
      type: GraphQLString,
      resolve(image) {
        return image.url;
      },
    },
    likes: {
      type: GraphQLInt,
      resolve(image) {
        return image.likes;
      },
    },
  }),
});

const Post = new GraphQLObjectType({
  name: "Post",
  description: "This is a typical post",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(post) {
        return post.id;
      },
    },
    title: {
      type: GraphQLString,
      resolve(post) {
        return post.title;
      },
    },
    message: {
      type: GraphQLString,
      resolve(post) {
        return post.message;
      },
    },
    status: {
      type: GraphQLString,
      resolve(post) {
        return post.status;
      },
    },
    userId: {
      type: GraphQLInt,
      resolve(post) {
        return post.userId;
      },
    },
    likes: {
      type: GraphQLInt,
      resolve(post) {
        return post.likes;
      },
    },
  }),
});

const ShoppingCart = new GraphQLObjectType({
  name: "ShoppingCart",
  description: "This is a typical shopping cart",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(shoppingcart) {
        return shoppingcart.id;
      },
    },
    userId: {
      type: GraphQLInt,
      resolve(shoppingcart) {
        return shoppingcart.userId;
      },
    },
    totalValue: {
      type: GraphQLString,
      resolve(shoppingcart) {
        return shoppingcart.totalValue;
      },
    },
    status: {
      type: GraphQLString,
      resolve(shoppingcart) {
        return shoppingcart.status;
      },
    },
    cartproducts: {
      type: new GraphQLList(CartProduct),
      resolve(shoppingcart) {
        return shoppingcart.getCartproducts();
      },
    },
  }),
});

const CartProduct = new GraphQLObjectType({
  name: "CartProduct",
  description: "This is a typical cart product",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(cartproduct) {
        return cartproduct.id;
      },
    },
    userId: {
      type: GraphQLInt,
      resolve(cartproduct) {
        return cartproduct.userId;
      },
    },
    shoppingcartId: {
      type: GraphQLInt,
      resolve(cartproduct) {
        return cartproduct.shoppingcartId;
      },
    },
    productId: {
      type: GraphQLInt,
      resolve(cartproduct) {
        return cartproduct.productId;
      },
    },
    quantity: {
      type: GraphQLInt,
      resolve(cartproduct) {
        return cartproduct.quantity;
      },
    },
    status: {
      type: GraphQLString,
      resolve(cartproduct) {
        return cartproduct.status;
      },
    },
    product: {
      type: Product,
      resolve(cartproduct) {
        return db.models.product.findByPk(cartproduct.productId);
      }
    }
  }),
});

const Order = new GraphQLObjectType({
  name: "Order",
  description: "This is a typical order",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(order) {
        return order.id;
      },
    },
    userId: {
      type: GraphQLInt,
      resolve(order) {
        return order.userId;
      },
    },
    totalValue: {
      type: GraphQLString,
      resolve(order) {
        return order.totalValue;
      },
    },
    status: {
      type: GraphQLString,
      resolve(order) {
        return order.status;
      },
    },
    orderproducts: {
      type: new GraphQLList(Product),
      resolve(order) {
        return order.getProducts();
      },
    },
  }),
});

const checkAuth= async (headers) => {
  const userID = headers['authorization'];
  if(!userID) {
    throw new Error(errorName.UNAUTHORIZED);
  }
  const token = userID.split(' ')[1];
  const userAuth = await db.models.user.findOne({
    where: { uid: token }, raw: true
  });
  if(!userAuth) {
    throw new Error(errorName.AUTHFAILED);
  }
  console.log('Auth passed');
};


const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is the root query",
  fields: () => ({
    customers: {
      type: new GraphQLList(User),
      args: {
        id: {
          type: GraphQLInt,
        },
        email: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLString,
        },
      },
      async resolve(root, args, { headers }) {
        await checkAuth(headers);
        const customersData = await db.models.user.findAll({ where: args });
        return customersData;
      },
    },
    products: {
      type: new GraphQLList(Product),
      args: {
        id: {
          type: GraphQLInt,
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        price: {
          type: GraphQLInt,
        },
        status: {
          type: GraphQLString,
        },
      },
      async resolve(root, args, { headers }) {
        await checkAuth(headers);
        const productsData = await db.models.product.findAll({ where: args });
        return productsData;
      },
    },
    images: {
      type: new GraphQLList(Image),
      args: {
        id: {
          type: GraphQLInt,
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLString,
        },
      },
      resolve(root, args) {
        return db.models.image.findAll({ where: args });
      },
    },
    posts: {
      type: new GraphQLList(Post),
      args: {
        id: {
          type: GraphQLInt,
        },
        title: {
          type: GraphQLString,
        },
        message: {
          type: GraphQLString,
        },
      },
      resolve(root, args) {
        return db.models.post.findAll({ where: args });
      },
    },
    shoppingcarts: {
      type: new GraphQLList(ShoppingCart),
      args: {
        id: {
          type: GraphQLInt,
        },
        status: {
          type: GraphQLString,
        },
        userId: {
          type: GraphQLInt,
        },
      },
      resolve(root, args) {
        return db.models.shoppingcart.findAll({
          where: args,
            include: [
              { model: db.models.cartproduct, as: 'cartproducts',
                  include: [
                    { model: db.models.product }
                  ]
              }
            ] 
        });
      },  
    },
    orders: {
      type: new GraphQLList(Order),
      args: {
        id: {
          type: GraphQLInt,
        },
        status: {
          type: GraphQLString,
        },
        userId: {
          type: GraphQLInt,
        },
      },
      resolve(root, args) {
        return db.models.order.findAll({
          where: args,
            include: [
              { model: db.models.orderproduct,
                  include: [
                    { model: db.models.product }
                  ]
              }
            ] 
        });
      },  
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Functions to manipulate data",
  fields() {
    return {
      addUser: {
        type: User,
        args: {
          firstName: {
            type: GraphQLString,
          },
          lastName: {
            type: GraphQLString,
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          mobile: {
            type: GraphQLString,
          },
          uid: {
            type: new GraphQLNonNull(GraphQLString),
          },
          address: {
            type: GraphQLString,
          },
          status: {  
            type: GraphQLString,
          },
          birthday: {
            type: GraphQLString,
          },
          profileImage: {
            type: GraphQLString,
          },
        },
       async resolve(_, args) {
        
        try {
          const newUser = await db.models.user.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email.toLowerCase(),
                    mobile: args.mobile,
                    uid: args.uid,
                    address: args.address,
                    status: args.status,
                    birthday: args.birthday,
                    profileImage: args.profileImage,
                  });
            return newUser;
          } catch(error) {
            throw new Error(errorName.ALREADYEXIST)
          }        
        },
      },

      updateUser: {
        type: User,
        args: {
          firstName: {
            type: GraphQLString,
          },
          lastName: {
            type: GraphQLString,
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          mobile: {
            type: GraphQLString,
          },
          uid: {
            type: GraphQLString,
          },
          address: {
            type: GraphQLString,
          },
          status: {
            type: GraphQLString,
          },
          birthday: {
            type: GraphQLString,
          },
          profileImage: {
            type: GraphQLString,
          },
        },
        async resolve(_, args, { headers }) {
        
          await checkAuth(headers);
          try {
            const updatedUser = await db.models.user.update(
              {
                firstName: args.firstName,
                lastName: args.lastName,
                mobile: args.mobile,
                uid: args.uid,
                address: args.address,
                status: args.status,
                birthday: args.birthday,
                profileImage: args.profileImage,
              },
              { where: { email: args.email } }
            );
            return updatedUser;
          } catch(error) {
            throw new Error(errorName.NOTFOUND)
          }
        },
      },

      deleteUser: {
        type: User,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          uid: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
            const deletedUser = await db.models.user.destroy({
              where: { email: args.email, uid: args.uid },
            });
            return deletedUser;
          } catch(error) {
            throw new Error(errorName.NOTFOUND)
          }        
        },
      },

      addProduct: {
        type: Product,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          description: {
            type: new GraphQLNonNull(GraphQLString),
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          price: {
            type: GraphQLInt,
          },
          status: {
            type: GraphQLString,
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
            const newProduct = await db.models.product.create({
              name: args.name,
              description: args.description,
              userId: args.userId,
              price: args.price,
              status: args.status ? args.status : "basic",
            });
            return newProduct;
          } catch(error) {
            throw new Error(errorName.ALREADYEXIST)
          }        
        },
      },       
        
      updateProduct: {
        type: Product,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          name: {
            type: GraphQLString,
          },
          description: {
            type: GraphQLString,
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          status: {
            type: GraphQLString,
          },
          price: {
            type: GraphQLInt,
          },
          likes: {
            type: GraphQLInt,
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
            const updatedProduct = await db.models.product.update(
              {
                name: args.name,
                description: args.description,
                status: args.status,
                price: args.price,
                likes: args.likes,
              },
              {
                where: {
                  id: args.id,
                  userId: args.userId,
                },
              });
              return updatedProduct;
          } catch(error) {
            console.log(error);
            throw new Error(errorName.NOTFOUND)
          }
        },
      },

      deleteProduct: {
        type: Product,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
              const deletedProduct = await db.models.product.destroy({
                where: { id: args.id, userId: args.userId },
              });
              return deletedProduct;
          } catch(error) {
            throw new Error(errorName.NOTFOUND)
          }
        },
      },

      addImage: {
        type: Image,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          description: {
            type: new GraphQLNonNull(GraphQLString),
          },
          productId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          status: {
            type: GraphQLString,
          },
          url: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        async resolve(_, args, { headers }) {
          
          await checkAuth(headers);
          try {
            const newImage = await db.models.image.create({
              name: args.name,
              description: args.description,
              productId: args.productId,
              status: args.status ? args.status : "basic",
              url: args.url,
              likes: 0,
            });
            return newImage;
          } catch(error) {
            throw new Error(errorName.ALREADYEXIST)
          } 
          },
        },
        
      updateImage: {
        type: Image,
        args: {
          id:   {
            type: new GraphQLNonNull(GraphQLInt),
          },
          name: {
            type: GraphQLString,
          },
          description: {
            type: GraphQLString,
          },
          productId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          status: {
            type: GraphQLString,
          },
          url: {
            type: GraphQLString,
          },
          likes: {
            type: GraphQLInt,
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
            const updatedImage = await db.models.image.update(
              {
                name: args.name,
                description: args.description,
                status: args.status ? args.status : "basic",
                url: args.url,
                likes: 0,
              },
              {
                where: {
                  id: args.id,
                  productId: args.productId,
                },
              });
              return updatedImage;
            } catch(error) {
              throw new Error(errorName.NOTFOUND)
            } 
            },
          },

      deleteImage: {
        type: Image,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          productId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
            const deletedImage = await db.models.image.destroy({
              where: { id: args.id, productId: args.productId },
            });
            return deletedImage;
          } catch(error) {
            throw new Error(errorName.NOTFOUND)
          } 
          },
        },

      createPost: {
        type: Post,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString),
          },
          message: {
            type: new GraphQLNonNull(GraphQLString),
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          status: {
            type: GraphQLString,
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
            const newPost = await db.models.post.create({
              title: args.title,
              message: args.message,
              userId: args.userId,
              status: args.status ? args.status : "basic",
              likes: 0,
            });
            return newPost;
          } catch(error) {
            throw new Error(errorName.ALREADYEXIST)
          } 
        },
      },

      updatePost: {
        type: Post,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          title: {
            type: GraphQLString,
          },
          message: {
            type: GraphQLString,
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          status: {
            type: GraphQLString,
          },
          likes: {
            type: GraphQLInt,
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
            const updatedPost = await db.models.post.update(
              {
                tite: args.title,
                message: args.message,
                userId: args.userId,
                status: args.status ? args.status : "basic",
                likes: 0,
              },
              {
                where: {
                  id: args.id,
                  userId: args.userId,
                },
              });
              return updatedPost;
            } catch(error) {
              throw new Error(errorName.NOTFOUND)
            } 
        },
      },

      deletePost: {
        type: Post,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
            const deletedPost= await db.models.post.destroy({
              where: { id: args.id, userId: args.userId },
            });
            return deletedPost;
          } catch(error) {
            throw new Error(errorName.NOTFOUND)
          } 
        },
      },

      addToCart: {
        type: ShoppingCart,
        args: {
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          productId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          quantity: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          status: {
            type: GraphQLString,
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
          const productExist: any = await db.models.product.findByPk(args.productId, {
            raw: true,
            nest: true
          })
          if(!productExist) throw new Error(errorName.NOTFOUND);
          console.log('product exist');
         
          const shoppingCartExist: any = await db.models.shoppingcart.findOne({
            where: {
              userId: args.userId,
            },
            raw: true,
            nest: true
          });
          if(shoppingCartExist){
            console.log('shoppingcart exist');
            const cartProductExist: any = await db.models.cartproduct.findOne({
              where: {
                shoppingcartId: shoppingCartExist.id,
                productId: args.productId
              },
              raw: true,
              nest: true
            });
            if(!cartProductExist) {
              console.log('product does not exist in cart');
              const newCartProduct: any = await db.models.cartproduct.create({
                userId: args.userId,
                quantity: args.quantity,
                shoppingcartId: shoppingCartExist.id,
                productId: args.productId
              },
              {
                raw: true
              });
              console.log('new cartproduct');
              const updateShoppingCart = await db.models.shoppingcart.update({
                totalValue: args.quantity * productExist.price,
              }, {
                where: {
                  userId: args.userId,
                }
              });
              console.log('updating shoppingcart');
              const shoppingCartData1 = await db.models.shoppingcart.findAll({
                where: {
                userId: args.userId,
                },
                include : [
                  { model: db.models.cartproduct, as: 'cartproducts',
                    include: [
                      { model: db.models.product }
                    ] 
                  }
                ]
              });
              return shoppingCartData1;
            } else {
                  console.log(`${cartProductExist.quantity} units of product exist in cart`);
                  console.log(`updating cartproduct by: ${args.quantity} units`);
                  await db.models.cartproduct.update({
                    quantity: cartProductExist.quantity + args.quantity,
                  }, 
                  { where: {
                    shoppingcartId: shoppingCartExist.id,
                    productId: args.productId
                  }
                });
                console.log(`updating shoppingcart by: N${args.quantity * productExist.price}`);
                await db.models.shoppingcart.update({
                  totalValue: shoppingCartExist.totalValue + (args.quantity * productExist.price),
                }, {
                  where: {
                    userId: args.userId,
                  }
                });
              const shoppingCartData2 = await db.models.shoppingcart.findAll({
                where: {
                userId: args.userId,
                },
                include : [
                  { model: db.models.cartproduct, as: 'cartproducts',
                    include: [
                      { model: db.models.product }
                    ] 
                  }
                ]
              });
              return shoppingCartData2;
            }
          } else {
            console.log('creating new shoppingcart');
            const newShoppingCart: any = await db.models.shoppingcart.create({ 
              userId: args.userId
            },
            {
              raw: true
            });
            console.log('creating new cartproduct');
            const newCartProduct = await db.models.cartproduct.create({
              userId: args.userId,
              quantity: args.quantity,
              shoppingcartId: newShoppingCart.id,
              productId: args.productId
            },
            {
              raw: true
            });
            console.log('updating shoppingcart');
              await db.models.shoppingcart.update({
                totalValue: args.quantity * productExist.price,
              }, {
                where: {
                  userId: args.userId,
                }
              });
              const shoppingCartData3 = await db.models.shoppingcart.findAll({
                where: {
                userId: args.userId,
                },
                include : [
                  { model: db.models.cartproduct, as: 'cartproducts',
                    include: [
                      { model: db.models.product }
                    ] 
                  }
                ]
              });
              return shoppingCartData3;
          }
        } catch(error) {
          console.log(error);
          throw new Error(errorName.NOTFOUND);
        }
        },
      },
      makeOrder: {
        type: Order,
        args: {
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          productId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          quantity: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          status: {
            type: GraphQLString,
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
          const productAvailable: any = await db.models.product.findByPk(args.productId, {
            raw: true,
            nest: true
          })
          if(!productAvailable) throw new Error(errorName.NOTFOUND);
          console.log('product available');
         
          const orderActive:any = await db.models.order.findOne({
            where: {
              userId: args.userId,
              status: 'active'
            },
            include: [
              {model: db.models.product, as: 'products',
              // through: {
              //   model: db.models.orderproduct}
              }],
            raw: true,
            nest: true
          });
          if(orderActive){
            console.log('active order exist');
            const productExistOnOrder: any = await db.models.orderproduct.findOne({
              where: {
                orderId: orderActive.id,
              productId: productAvailable.id
              },
              raw: true
            });
            if(productExistOnOrder) {
              console.log('product exist on order');
              await db.models.orderproduct.update({
                quantity: productExistOnOrder.quantity + args.quantity
              }, {
                where: {
                  orderId: orderActive.id,
                productId: productAvailable.id
                }
              });
              await db.models.order.update({
                totalValue: orderActive.totalValue + (productAvailable.price * args.quantity)
              }, {
                where: {
                id: orderActive.id,
                }
              });
              console.log('same product added to active order');
              // return orderActive;
              return db.models.order.findOne({
                where: {
                  id: orderActive.id
                }
              });
            } else {
              console.log('product does not exist on order');
              await db.models.orderproduct.create({
                userId: args.userId,
                orderId: orderActive.id,
                productId: productAvailable.id,
                quantity: args.quantity
              });
              await db.models.order.update({
                totalValue: orderActive.totalValue + (productAvailable.price * args.quantity)
              }, {
                where: {
                id: orderActive.id,
                }
              });
              console.log('new product added to active order');
              // return orderActive;
              return db.models.order.findOne({
                where: {
                  id: orderActive.id
                }
              });
            }
          } else {
            console.log('creating new order');
            const newOrder: any = await db.models.order.create({ 
              userId: args.userId,
              status: 'active'
            },
            {
              raw: true
            });
            await db.models.orderproduct.create({
              userId: args.userId,
              orderId: newOrder.id,
              productId: productAvailable.id,
              quantity: args.quantity
            });
            await db.models.order.update({
              totalValue: newOrder.totalValue + (productAvailable.price * args.quantity)
            },
            {
              where: {
              id: newOrder.id,
              }
            });
            console.log('new product added to new order');
              // return newOrder;
              return db.models.order.findOne({
                where: {
                  id: newOrder.id
                }
              });
          }
        } catch(error) {
          console.log(error);
          throw new Error(errorName.NOTFOUND);
        }
        },
      },
      removeOrder: {
        type: Order,
        args: {
          userId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          productId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          quantity: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          status: {
            type: GraphQLString,
          },
        },
        async resolve(_, args, { headers }) {

          await checkAuth(headers);
          try {
          const productAvailable: any = await db.models.product.findByPk(args.productId, {
            raw: true,
            nest: true
          })
          if(!productAvailable) throw new Error(errorName.NOTFOUND);
          console.log('product available');
         
          const orderActive:any = await db.models.order.findOne({
            where: {
              userId: args.userId,
              status: 'active'
            },
            include: [
              {model: db.models.product, as: 'products',
              }],
            raw: true,
            nest: true
          });
          if(orderActive){
            console.log('active order exist');
            const productExistOnOrder: any = await db.models.orderproduct.findOne({
              where: {
                orderId: orderActive.id,
              productId: productAvailable.id
              },
              raw: true
            });
            if(!productExistOnOrder) {
              console.log('product does not exist on order');
              throw new Error(errorName.NOTFOUND);         
            } else {
              console.log('product exist on order');
              if(productExistOnOrder.quantity < 2) {
                await db.models.orderproduct.destroy({
                  where: {
                    orderId: orderActive.id,
                  productId: productAvailable.id
                  }
                });
                console.log('last product unit removed from order');
              } else {
                await db.models.orderproduct.update({
                  quantity: productExistOnOrder.quantity - args.quantity
                }, {
                  where: {
                    orderId: orderActive.id,
                  productId: productAvailable.id
                  }
                });
                console.log(`${args.quantity} units of product removed from active order`);
                await db.models.order.update({
                  totalValue: orderActive.totalValue - (productAvailable.price * args.quantity)
                }, {
                  where: {
                    id: orderActive.id,
                  }
                });
                console.log(`${productAvailable.price * args.quantity} reduced from order`);
              }
              return db.models.order.findOne({
                where: {
                  id: orderActive.id
                }
              });
            }
          } else {
            throw new Error(errorName.NOTFOUND);         
          }
        } catch(error) {
          console.log(error);
          throw new Error(errorName.NOTFOUND);
        }
        },
      }
    };
  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
