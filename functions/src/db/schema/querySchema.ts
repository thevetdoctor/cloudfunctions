import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
  } from 'graphql';
  import db from '../index';
  
  import { userSchema } from './userSchema';
  import { productSchema } from './productSchema';
  import { imageSchema } from './imageSchema';
  import { postSchema } from './postSchema';
    
  const User: any = new GraphQLObjectType(userSchema);
  const Product: any = new GraphQLObjectType(productSchema);
  const Image: any = new GraphQLObjectType(imageSchema);
  const Post: any = new GraphQLObjectType(postSchema);
  
  export const querySchema = {
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
  }