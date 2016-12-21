import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../api/Posts.js';

class TagFull extends Component {
  constructor() {
    super();

    this.state = {
    }
  }
  // render posts
  // comment
  // another commentttt
  renderPosts() {
    if ( this.props.posts.length > 0 ) {
      return this.props.posts.map( ( post ) => {
        return <div key={ post._id }>{post.title}</div>;
      });
    } else if (!this.props.posts) {
      return <div>No posts found.</div>;
    } else {
      return <div>Loading...</div>
    }
  }

  render() {
    return(
      <div>
        All posts of tag #{this.props.tag}
        <div>{this.renderPosts()}</div>
      </div>
    );
  }
}

// // this subscribes to imports/api.js publish method of Posts
export default createContainer((props) => {
  const { tagId } = props.params;

  Meteor.subscribe('posts');

  return {
    tag: tagId,
    posts: Posts.find({ tags: tagId }).fetch()
  };
}, TagFull);
