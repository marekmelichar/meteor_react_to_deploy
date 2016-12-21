import React, {Component} from 'react';
import Header from '../components/Header.jsx';
import Modal from 'react-modal';
import { browserHistory } from 'react-router';

import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../api/Posts.js';
import { User } from '../../api/User.js';
import PostShare from './PostShare.jsx';

class PostFull extends Component {

  constructor () {
    super();

    this.state = {
      openEdit: false,
      openDelete: false,
      title: '',
      content: ''
    }

    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  handleTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  openDeleteModal () { this.setState({openDelete: true}); }

  closeDeleteModal () { this.setState({openDelete: false}); }

  openEditModal () { this.setState({openEdit: true}); }

  closeEditModal () { this.setState({openEdit: false}); }

  onPostRemove(post) {
    Meteor.call('posts.remove', post);
    this.closeDeleteModal();
    return browserHistory.push('/posts');
  }

  onPostEdit(post) {
    Meteor.call('posts.update', post, this.state.title, this.state.content);
    return this.setState({
      title: '',
      content: ''
    });
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

  renderPost() {
    var post = this.props.post || [];

    return (
      <div className="container">
        <div className="post_title">{post.title}</div>

        { this.renderTags( post.tags ) }

        <span className="pull-right">
          <button
            className="btn btn-default"
            onClick={this.openEditModal}
            id="EditButton"
          >Edit</button>
          <button
            className="btn btn-danger"
            onClick={() => this.onPostRemove(post)}
            onClick={this.openDeleteModal}
          >Remove</button>
        </span>
        <Modal
          isOpen={this.state.openEdit}
          contentLabel="Edit Modal"
          style={customStyles}
        >
          <div className="container">
            <h2 data-toggle="tooltip" data-placement="top" title="Some tooltip text!">Editace poznámky</h2>
            <form onSubmit={() => this.onPostEdit(post)}>
              <div className="form-group">
                <label htmlFor="title">Nadpis</label>
                <input type="title" className="form-control" id="title" placeholder="Nadpis" onChange={this.handleTitle} />
              </div>
              <div className="form-group">
                <label htmlFor="body">Poznámka</label>
                <input type="body" className="form-control" id="body" placeholder="Poznámka" onChange={this.handleContent} />
              </div>
              <button type="submit" className="btn btn-default">Editovat poznámku</button>
              <div className="closeModal btn btn-default" onClick={this.closeEditModal}>Cancel</div>
            </form>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.openDelete}
          contentLabel="Delete Modal"
          style={customStyles}
        >
          Delete
          <button className="closeModal" onClick={this.closeDeleteModal}>Cancel</button>
          <button className="" onClick={() => this.onPostRemove(post)}>OK</button>
        </Modal>
        <div className="post_content">{post.content}</div>
        <PostShare post={post} />
      </div>
    );
  }

  render() {
    let content = [];
    if (User.isLoggedIn()) {
      content.push(
        <div key="a">
          <Header />
          <div className="container">
            <h1>Post Full</h1>
          </div>
          {this.renderPost()}
        </div>
      )
    } else {
      content.push(
        <div className="posts" key="b">
          <h1>You are not signed in to see your own content</h1>
          <a href="/">Go back to main page</a>
        </div>
      )
    }

    // console.log(this.props.post);

    return (
      <div>
        {content}
      </div>
    );
  }
}

// this subscribes to imports/api.js publish method of Posts
export default createContainer((props) => {
  const { postId } = props.params;

  Meteor.subscribe('posts');
  Meteor.subscribe('sharedPosts');

  return { post: Posts.findOne(postId) };
}, PostFull);

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
