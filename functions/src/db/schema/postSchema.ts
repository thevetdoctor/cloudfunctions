import {
    GraphQLInt,
    GraphQLString,
  } from 'graphql';
  
export const postSchema = {
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
  }