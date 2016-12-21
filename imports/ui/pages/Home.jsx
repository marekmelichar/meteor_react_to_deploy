import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import Header from '../components/Header.jsx';
import IconNotes from '../components/IconNotes.jsx';
import IconMail from '../components/IconMail.jsx';
import IconLock from '../components/IconLock.jsx';

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
          title: 'Nejde se přihlásit,',
          message: 'pravdpodobně ještě nejste zaregistrovaný uživatel.',
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-info',
          hideDelay: 2500,
        });
      } else {
        if (Meteor.userId()) {
          browserHistory.push('/posts');
        }
      }
    });
  }

  render() {
    return(
      <div className="main-page">
        <div className="container">
          <div className="icon-wrapper"><IconNotes fill="#2DB5CF" /></div>
          <h1>epoznamky.cz</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              {/* <label htmlFor="email">Email address</label> */}
              <input type="email" className="form-control" id="email" placeholder="Email" />
              <div className="icon-wrapper"><IconMail fill="#707680" /></div>
            </div>
            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <input type="password" className="form-control" id="password" placeholder="Password" />
              <div className="icon-wrapper"><IconLock fill="#707680" /></div>
            </div>
            <button type="submit" className="btn btn-default">Log in</button>
          </form>
          <div className="bottom_1">or</div>
          <a href="signup">Sign up</a>
        </div>
      </div>
    );
  }
}
