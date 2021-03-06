/* eslint no-underscore-dangle: off*/
/* eslint "arrow-body-style": off */

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import DataLoader from 'dataloader';
import fetch from 'node-fetch';

import Im from './ImType';
import Message from './MessageType';
import User from './UserType';

// const userLoader = new DataLoader()

const createLoaders = (fetchFn) => {
 return {
   User: new DataLoader(async (keys) => {
     return Promise.all(keys.map(async () => {
       const response = await fetchFn(‘get’, `/api/user`);

       return await response.json();
     }));
   }),
   Counters: new DataLoader((keys) => {
     return Promise.all(keys.map(async (id) => {
       const response = await fetchFn('get', `/api/counters/${id}`;

       return await response.json();
     });
   })
}


// export default function createLoaders(fetchFn) {
//  return {
//    User: new DataLoader(async (keys) => {
//      return Promise.all(keys.map(async () => {
//        const response = await fetchFn(‘get’, `/api/user`);
//
//        return await response.json();
//      }));
//    }),
//    Counters: new DataLoader((keys) => {
//      return Promise.all(keys.map(async (id) => {
//        const response = await fetchFn('get', `/api/counters/${id}`;
//
//        return await response.json();
//      });
//    })
// }


const Query = new GraphQLObjectType({
  name: 'SlackAPI',
  description: 'Root of the Profile',
  fields: () => ({
    yo: {
      type: GraphQLString,
      resolve: () => 'hey',
    },
    ims: {
      type: new GraphQLList(Im),
      description: 'Returns list of private messages',
      resolve: (root, args, { slackToken }) => {
        return fetch(`https://slack.com/api/im.list?token=${slackToken}&pretty=1`)
        	.then(res => res.json())
        	.then(res => res.ims);
      },
    },
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
