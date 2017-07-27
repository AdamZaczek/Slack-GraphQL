// /* eslint "arrow-body-style": off */
//
// import {
//   GraphQLObjectType,
//   GraphQLSchema,
//   GraphQLString,
//   GraphQLList,
//   GraphQLBoolean,
// } from 'graphql';
//
// import fetch from 'node-fetch';
//
// const Im = new GraphQLObjectType({
//   name: 'Im',
//   description: 'This method returns a list of all private conversation channels that the user has',
//   fields: () => ({
//     id: { type: GraphQLString },
//     conversation: {
//       type: new GraphQLList(Message),
//       resolve: (root, args, { slackToken }) => {
//         return fetch(`https://slack.com/api/im.history?token=${slackToken}&channel=${root.id}&pretty=1`)
//         	.then(res => res.json())
//         	.then(res => res.messages);
//       },
//     },
//     user: {
//       type: User,
//       resolve: (root, args, { slackToken }) => {
//         return fetch(`https://slack.com/api/users.info?token=${slackToken}&user=${root.user}&pretty=1`)
//         	.then(res => res.json())
//         	.then(res => res.user);
//       }
//     },
//     created: { type: GraphQLString },
//     isDeleted: {
//       type: GraphQLBoolean,
//       resolve: root => root.is_user_deleted,
//     },
//   }),
// });
//
// const Message = new GraphQLObjectType({
//   name: 'Message',
//   description: 'Private message exchanged with a Slack channel member',
//   fields: () => ({
//     type: { type: GraphQLString },
//     ts: { type: GraphQLString },
//     text: { type: GraphQLString },
//     user: {
//       type: User,
//       resolve: (root, args, { slackToken }) => {
//         return fetch(`https://slack.com/api/users.info?token=${slackToken}&user=${root.user}&pretty=1`)
//         	.then(res => res.json())
//         	.then(res => res.user);
//       },
//     },
//   }),
// });
//
// const User = new GraphQLObjectType({
//   name: 'User',
//   description: 'Represents user we talk with',
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     deleted: { type: GraphQLString },
//     real_name: {
//       type: GraphQLString,
//       resolve: root => root.profile.real_name,
//     },
//     image_192: {
//       type: GraphQLString,
//       resolve: root => root.profile.image_192,
//     },
//     email: {
//       type: GraphQLString,
//       resolve: root => root.profile.email,
//     },
//   }),
// });
//
// const Query = new GraphQLObjectType({
//   name: 'SlackAPI',
//   description: 'Root of the Profile',
//   fields: () => ({
//     ims: {
//       type: new GraphQLList(Im),
//       description: 'Returns list of private messages',
//       resolve: (root, args, { slackToken }) => {
//         return fetch(`https://slack.com/api/im.list?token=${slackToken}&pretty=1`)
//         	.then(res => res.json())
//         	.then(res => res.ims);
//       },
//     },
//   }),
// });
//
// const Schema = new GraphQLSchema({
//   query: Query,
// });
//
// export default Schema;
