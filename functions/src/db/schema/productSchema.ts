import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
  } from 'graphql';
  
import { imageSchema } from './imageSchema';

const Image: any = new GraphQLObjectType(imageSchema);

  export const productSchema = {
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
  }