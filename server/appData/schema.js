/* eslint no-underscore-dangle: off*/
/* eslint "arrow-body-style": off */

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import fetch from 'node-fetch';


const Im = new GraphQLObjectType({
  name: 'Im',
  description: 'This method returns a list of all private conversation channels that the user has',
  fields: () => ({
    id: { type: GraphQLString },
    user: { type: GraphQLString },
    created: { type: GraphQLString },
    isDeleted: { type: GraphQLBoolean },
  })
});

const Query = new GraphQLObjectType({
  name: 'SlackAPI',
  description: 'Root of the Profile',
  fields: () => ({
    helloQuery: {
      type: GraphQLString,
      description: 'Our first query field!',
      resolve: () => {
        return 'Hello from GraphiQL';
      }
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
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;



/* eslint no-underscore-dangle: off*/
/* eslint "arrow-body-style": off */
/* eslint "no-use-before-define": off */

// import {
//   GraphQLList,
//   GraphQLObjectType,
//   GraphQLSchema,
//   GraphQLString,
//   GraphQLBoolean,
//   GraphQLInt
// } from 'graphql';
//
// import USER from './models/user';
// import SKILL from './models/skill';
// import LEVEL_SKILL from './models/levelSkill';
//
// const User = new GraphQLObjectType({
//   name: 'User',
//   description: 'Represents user',
//   fields: () => ({
//     _id: { type: GraphQLString },
//     firstName: { type: GraphQLString },
//     lastName: { type: GraphQLString },
//     role: { type: GraphQLString },
//     skillLevels: {
//       type: new GraphQLList(SkillLevel),
//       description: 'Returns list of skills for certain user',
//       resolve: (user) => {
//         return user._level_skills.map((singleLevelSkill) => {
//           return LEVEL_SKILL.findOne({ _id: singleLevelSkill }, (err, res) => {
//             if (err) return err;
//             return res;
//           });
//         });
//       }
//     }
//   })
// });
//
// const Skill = new GraphQLObjectType({
//   name: 'Skill',
//   description: 'Represents skill',
//   fields: () => ({
//     _id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     skillLevels: {
//       type: new GraphQLList(SkillLevel),
//       description: 'Returns list of levels corrsponding to the skill. It is similar to list of grades for a certain subject in school',
//       resolve: (skill) => {
//         return skill._level_skills.map((singleLevelSkill) => {
//           return LEVEL_SKILL.findOne({ _id: singleLevelSkill }, (err, res) => {
//             if (err) return err;
//             return res;
//           });
//         });
//       }
//     }
//   })
// });
//
// const SkillLevel = new GraphQLObjectType({
//   name: 'SkillLevel',
//   description: 'Describes how well user knows certain skill.',
//   fields: () => ({
//     _id: { type: GraphQLString },
//     level: {
//       type: GraphQLInt,
//       description: 'Actual skill level, ranked from 1 to 3'
//     },
//     favorite: { type: GraphQLBoolean },
//     user: {
//       type: User,
//       description: 'Owner of the skill',
//       resolve: (skillLevel) => {
//         return USER.findOne({ _id: skillLevel.user });
//       }
//     },
//     skill: {
//       type: Skill,
//       description: 'Rated skill',
//       resolve: (skillLevel) => {
//         return SKILL.findOne({ _id: skillLevel.skill });
//       }
//     }
//   })
// });
//
// const Query = new GraphQLObjectType({
//   name: 'ProfileSchema',
//   description: 'Root of the Profile',
//   fields: () => ({
//     helloQuery: {
//       type: GraphQLString,
//       description: 'Our first query field!',
//       resolve: () => {
//         return 'Hello from GraphiQL';
//       }
//     },
//     users: {
//       type: new GraphQLList(User),
//       description: 'Netguru members',
//       resolve: () => {
//         return USER.find({}, (err, res) => {
//           return res;
//         });
//       }
//     },
//     skills: {
//       type: new GraphQLList(Skill),
//       description: 'List of available skills to chose from',
//       resolve: () => {
//         return SKILL.find({}, (err, res) => {
//           return res;
//         });
//       }
//     },
//     skillLevels: {
//       type: new GraphQLList(SkillLevel),
//       description: 'List of levels of certain skills for example { javascript: 3, favorite: true }.',
//       resolve: () => {
//         return LEVEL_SKILL.find({}, (err, res) => {
//           return res;
//         });
//       }
//     }
//   })
// });
//
// const Schema = new GraphQLSchema({
//   query: Query
// });
//
// export default Schema;
