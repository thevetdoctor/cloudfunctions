import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
  } from 'graphql';
import { productSchema } from './productSchema';
import { postSchema } from './postSchema';
  
const Product: any = new GraphQLObjectType(productSchema);
const Post: any = new GraphQLObjectType(postSchema);

export const userSchema = {
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
  }