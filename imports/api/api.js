import { User } from './User.js';
import { Posts } from './Posts.js';

Meteor.startup(() => {

  // this makes available data from Mongo db to everywhere, sorted by actual userID
  Meteor.publish('posts', function() {
    return Posts.find({ ownerId: this.userId });
  });

  Meteor.publish('sharedPosts', function() {
    const user = Meteor.users.findOne(this.userId);

    if (!user) {
      return;
    }

    const email = user.emails[0].address;

    return Posts.find({
      sharedWith: { $elemMatch: { $eq: email }}
    });
  });

  Meteor.publish( 'tags', function( tag ) {
  check( tag, String );
  return Posts.find( { published: true, tags: { $in: [ tag ] } } );
});
});
