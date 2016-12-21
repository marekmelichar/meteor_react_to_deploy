import React, { Component } from 'react';

export default class PostShare extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      sharedWith: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sharedWith: nextProps.post.sharedWith
    });
  }

  // shouldComponentUpdate() {
  //   return this.props.post.sharedWith !== "undefined" || this.props.post.sharedWith !== []
  // }

  onShare() {
    const email = this.refs.email.value;

    this.setState({
      email: email
    });

    Meteor.call('posts.share', this.props.post, email);



  }

  renderShareList() {
    return this.state.sharedWith.map(email => {
      return <button
        key={email}
        className="btn btn-default">
          {email}
      </button>
    });
  }

  render() {
    // console.log(this.state.sharedWith);
    return(
      <footer className="post-share">
        <div className="input-group">
          <input ref="email" className="form-control" />
          <div className="input-group-btn">
            <button
              onClick={this.onShare.bind(this)}
              className="btn btn-default">
              Sdílet poznámku
            </button>
          </div>
        </div>
        <div>
          Sdíleno s:
        </div>
        <div className="btn-group">
          {this.renderShareList()}
        </div>
      </footer>
    );
  }
}
