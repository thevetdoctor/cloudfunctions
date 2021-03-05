import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
  } from 'graphql';
  
  import db from './index';
  
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
      uid: {
        type: GraphQLString,
        resolve(user) {
          return user.uid;
        },
      },
      products: {
        type: new GraphQLList(Product),
        resolve(user) {
          return user.getProducts();
        },
      },
    }),
  });
  
  const Product: any = new GraphQLObjectType({
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
      customer: {
        type: User,
        resolve(product) {
          return product.getUsers();
        },
      },
    }),
  });
  
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
        },
        resolve(root, args) {
          return db.models.product.findAll({ where: args });
        },
      },
    }),
  });
  
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
            uid: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(_, args) {
            return db.models.user.create({
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email.toLowerCase(),
              uid: args.uid
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
            customerId: {
              type: new GraphQLNonNull(GraphQLInt),
            }
          },
          resolve(_, args) {
            return db.models.product.create({
              name: args.name,
              description: args.description,
              customer: {
                type: User,
                resolve(_: any, args: any) {
                  return db.models.user.findOne(args.customerId)
                }
              }
            });
          }
        }
      }
    }
  });
  
  const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
  });
  
  export default Schema;
  