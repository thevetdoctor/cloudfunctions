import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema
  } from 'graphql';
  import db from '../index';

  const User = new GraphQLObjectType({
    name: 'User',
    description: 'This is a typical user',
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
      posts: {
        type: new GraphQLList(Post),
        resolve(user) {
          return user.getPosts();
        },
      },
    }),
  });

  const Product = new GraphQLObjectType({
    name: 'Product',
    description: 'This is a typical product',
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
        }
      },
      likes: {
        type: GraphQLInt,
        resolve(product) {
          return product.likes;
        }
      },
      imageCollection: {
        type: new GraphQLList(Image),
        resolve(user) {
          return user.getImages();
        },
      },    
    })
  })

  const Image = new GraphQLObjectType({
    name: 'Image',
    description: 'This is a typical image',
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
        }
      }
    })
  })

  const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'This is a typical post',
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
      } 
    })
  })

  const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is the root query',
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
        resolve(root, args) {
          return db.models.user.findAll({ where: args });
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
        resolve(root, args) {
          return db.models.product.findAll({ where: args });
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
    }),
  })

  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Functions to manipulate data',
    fields() {
      return {
        addUser: {
          type: User,
          args: {
            firstName: {
              type: GraphQLString
            },
            lastName: {
              type: GraphQLString
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            mobile: {
              type: GraphQLString
            },
            uid: {
              type: new GraphQLNonNull(GraphQLString)
            },
            address: {
              type: GraphQLString
            },
            status: {
              type: GraphQLString
            },
            birthday: {
              type: GraphQLString
            },
            profileImage: {
              type: GraphQLString
            }    
          },
          resolve(_, args) {
            return db.models.user.create({
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email.toLowerCase(),
              mobile: args.mobile,
              uid: args.uid,
              address: args.address,
              status: args.status,
              birthday: args.birthday,
              profileImage: args.profileImage
            });
          }
        },
        updateUser: {
          type: User,
          args: {
            firstName: {
              type: GraphQLString
            },
            lastName: {
              type: GraphQLString
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            mobile: {
              type: GraphQLString
            },
            uid: {
              type: GraphQLString
            },
            address: {
              type: GraphQLString
            },
            status: {
              type: GraphQLString
            },
            birthday: {
              type: GraphQLString
            },
            profileImage: {
              type: GraphQLString
            }         
          },
          resolve(_, args) {
            return db.models.user.update({
              firstName: args.firstName,
              lastName: args.lastName,
              mobile: args.mobile,
              uid: args.uid,
              address: args.address,
              status: args.status,
              birthday: args.birthday,
              profileImage: args.profileImage,
            }, { where: { email: args.email } 
          });
          }
        },
        deleteUser: {
          type: User,
          args: {
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            uid: {
              type: new GraphQLNonNull(GraphQLString)
            }        
          },
          resolve(_, args) {
            return db.models.user.destroy({ 
              where: { email: args.email,
                         uid: args.uid
                    } 
            });
          }
        },
        addProduct: {
          type: Product,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            description: {
              type: new GraphQLNonNull(GraphQLString)
            },
            userId: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            price: {
              type: GraphQLInt,
            },
            status: {
              type: GraphQLString,
            }
          },
          resolve(_, args) {
            return db.models.product.create({
              name: args.name,
              description: args.description,
              userId: args.userId,
              price: args.price,
              status: args.status ? args.statu : 'basic'
            });
          }
        },
        updateProduct: {
          type: Product,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            name: {
              type: GraphQLString
            },
            description: {
              type: GraphQLString
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
          resolve(_, args) {
            return db.models.product.update({
              name: args.name,
              description: args.description,
              status: args.status,
              price: args.price,
              likes: args.likes
            }, { where: { 
              id: args.id, 
              userId: args.userId 
            }
          });
          }
        },
        deleteProduct: {
          type: Product,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            userId: {
              type: new GraphQLNonNull(GraphQLInt)
            }        
          },
          resolve(_, args) {
            return db.models.product.destroy({ 
              where: { id: args.id,
                     userId: args.userId
                    }
            });
          }
        },       
        addImage: {
          type: Image,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            description: {
              type: new GraphQLNonNull(GraphQLString)
            },
            productId: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            status: {
              type: GraphQLString,
            },
            url: {
              type: new GraphQLNonNull(GraphQLString),
            }
          },
          resolve(_, args) {
            return db.models.image.create({
              name: args.name,
              description: args.description,
              productId: args.productId,
              status: args.status ? args.status : 'basic',
              url: args.url,
              likes: 0
            });
          }
        },
        updateImage: {
          type: Image,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            name: {
              type: GraphQLString
            },
            description: {
              type: GraphQLString
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
            }
          },
          resolve(_, args) {
            return db.models.image.update({
              name: args.name,
              description: args.description,
              status: args.status ? args.status : 'basic',
              url: args.url,
              likes: 0
            }, { where: { 
              id: args.id, 
              productId: args.productId 
            }
          });
          }
        },
        deleteImage: {
          type: Image,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            productId: {
              type: new GraphQLNonNull(GraphQLInt)
            }        
          },
          resolve(_, args) {
            return db.models.image.destroy({ 
              where: { id: args.id,
                     productId: args.productId
                    }
            });
          }
        },
        createPost: {
          type: Post,
          args: {
            title: {
              type: new GraphQLNonNull(GraphQLString)
            },
            message: {
              type: new GraphQLNonNull(GraphQLString)
            },
            userId: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            status: {
              type: GraphQLString,
            }
          },
          resolve(_, args) {
            return db.models.post.create({
              title: args.title,
              message: args.message,
              userId: args.userId,
              status: args.status ? args.status : 'basic',
              likes: 0
            });
          }
        },
        updatePost: {
          type: Post,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            title: {
              type: GraphQLString
            },
            message: {
              type: GraphQLString
            },
            userId: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            status: {
              type: GraphQLString,
            },
            likes: {
              type: GraphQLInt,
            }
          },
          resolve(_, args) {
            return db.models.post.update({
              tite: args.title,
              message: args.message,
              userId: args.userId,
              status: args.status ? args.status : 'basic',
              likes: 0
            }, { where: { 
              id: args.id,
              userId: args.userId 
            }
          });
          }
        },
        deletePost: {
          type: Post,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            userId: {
              type: new GraphQLNonNull(GraphQLInt)
            }        
          },
          resolve(_, args) {
            return db.models.post.destroy({ 
              where: { id: args.id,
                     userId: args.userId
                    }
            });
          }
        }
      }
    }
  })

  const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
  });
  
  export default Schema;