import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'posts.insert': function(title, content, tags) {
    return Posts.insert({
      createdAt: new Date(),
      title: title,
      content: content,
      sharedWith: [],
      ownerId: this.userId,
      tags: tags
    });
  },

  'posts.remove': function(post) {
    return Posts.remove(post);
  },

  'posts.update': function(post, title, content) {
    return Posts.update(post._id, { $set: { title, content } });
  },

  'posts.share': function(post, email) {
    return Posts.update(post._id, { $push: { sharedWith: email }});
  }
});

export const Posts = new Mongo.Collection('posts');
