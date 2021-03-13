import {
    GraphQLInt,
    GraphQLString,
  } from 'graphql';

export const imageSchema = {
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
  }