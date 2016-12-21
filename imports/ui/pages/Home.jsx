import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import Header from '../components/Header.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let el = $(event.target);

    let email = el.find('#email').val();
    let password = el.find('#password').val();

    Meteor.loginWithPassword(email, password, function(err){
      if (err) {
        Bert.alert({
          title: 'There was a problem with signing you in',
          message: 'You are probably not registered yet',
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-music'
        });
      } else {
        if (Meteor.userId()) {
          // console.log(Meteor.userId());
          browserHistory.push('/posts');
        }
      }
    });
  }

  render() {
    return(
      <div className="container">
        <h1 data-toggle="tooltip" data-placement="top" title="Some tooltip text!">epoznamky.cz</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default">Log in</button>
        </form>
        <div>or</div>
        <a href="signup">Sign up</a>
      </div>
    );
  }
}
