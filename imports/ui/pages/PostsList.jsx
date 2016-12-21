import React, {Component} from 'react';
import Header from '../components/Header.jsx';
import Modal from 'react-modal';

import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../api/Posts.js';
import { User } from '../../api/User.js';

class PostsList extends Component {

  constructor () {
    super();

    this.state = {
      open: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.addPost = this.addPost.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  onPostRemove(post) {
    Meteor.call('posts.remove', post);
    return this.closeModal();
  }

  renderTags( tags ) {
    if ( tags ) {
      return <div className="tags">
        {tags.map( ( tag ) => {
          return <a className="tag" href={ `/tags/${ tag }` } key={tag}>#{ tag }</a>;
        })}
      </div>;
    }
  }

  renderList() {
    return this.props.posts.map(post => {
      const url = `/posts/${post._id}`;

      return (
        <li className="list-group-item" key={post._id}>
          <a href={url}>{post.title} {post._id}</a>
          { this.renderTags( post.tags ) }

          <span className="pull-right">
            <button
              className="btn btn-danger"
              // onClick={() => this.onPostRemove(post)}
              onClick={this.openModal}
            >Remove</button>
          </span>
          <Modal
            isOpen={this.state.open}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <button className="closeModal" onClick={this.closeModal}>Cancel</button>
            <button className="" onClick={() => this.onPostRemove(post)}>OK</button>
          </Modal>
        </li>
      );
    });
  }

  render() {
    console.log(this.props.posts);
    let content = [];
    if (User.isLoggedIn()) {
      content.push(
        <div key="a">
          <Header />
          <div className="container posts">
            <h1>Posts</h1>
          </div>
          <ul className="container list-group list-of-posts">
            {this.renderList()}
          </ul>
        </div>
      )
    } else {
      content.push(
        <div className="container posts" key="b">
          <h1>You are not signed in to see your own content</h1>
          <a href="/">Go back to main page</a>
        </div>
      )
    }

    // console.log(this.props.posts);

    return (
      <div>
        {content}
      </div>
    );
  }
}

// this subscribes to imports/api.js publish method of Posts
export default createContainer(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('sharedPosts');

  return { posts: Posts.find({}).fetch() };
}, PostsList);

const customStyles =
  {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}
