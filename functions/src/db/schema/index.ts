import {
    GraphQLObjectType,
    GraphQLSchema,
  } from 'graphql';
import { querySchema } from './querySchema';
import { mutationSchema } from './mutationSchema';
  
  const Query = new GraphQLObjectType(querySchema);
  const Mutation = new GraphQLObjectType(mutationSchema);
  
  const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
  });
  
  export default Schema;
  