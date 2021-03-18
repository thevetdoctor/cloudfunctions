import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

import { userSchema } from './userSchema';
import { productSchema } from './productSchema';
import { imageSchema } from './imageSchema';
import { postSchema } from './postSchema';
import db from '../index';
    
  const User: any = new GraphQLObjectType(userSchema);
  const Product: any = new GraphQLObjectType(productSchema);
  const Image: any = new GraphQLObjectType(imageSchema);
  const Post: any = new GraphQLObjectType(postSchema);
  
  export const mutationSchema = {
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
            }, { where: { userId: args.userId }});
          }
        },
        deleteProduct: {
          type: Product,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            userId: {
              type: new GraphQLNonNull(GraphQLInt)
            }        
          },
          resolve(_, args) {
            return db.models.product.destroy({ 
              where: { name: args.name,
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
            }, { where: {productId: args.productId }});
          }
        },
        deleteImage: {
          type: Image,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            productId: {
              type: new GraphQLNonNull(GraphQLInt)
            }        
          },
          resolve(_, args) {
            return db.models.image.destroy({ 
              where: { name: args.name,
                     userId: args.productId
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
              tite: args.title,
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
            }, { where: { userId: args.userId }
          });
          }
        },
        deletePost: {
          type: Post,
          args: {
            title: {
              type: new GraphQLNonNull(GraphQLString)
            },
            userId: {
              type: new GraphQLNonNull(GraphQLInt)
            }        
          },
          resolve(_, args) {
            return db.models.post.destroy({ 
              where: { name: args.title,
                     userId: args.userId
                    }
            });
          }
        }
      }
    }
  } 