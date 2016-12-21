import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Header from '../components/Header.jsx';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   $('[data-toggle="tooltip"]').tooltip();
  // }

  onSubmit(event) {
    event.preventDefault();

    let el = $(event.target);

    let email = el.find('#email').val();
    let password = el.find('#password').val();
    let confirmPassword = el.find('#confirmPassword').val();

    if (password === confirmPassword && password !== "" && confirmPassword !== "") {
      let userInfo = { email, password };

      Accounts.createUser(userInfo, function(err){
        if (err) {
          Bert.alert({
            title: 'There was a problem',
            message: err,
            type: 'danger',
            style: 'growl-top-right',
            icon: 'fa-music'
          });
        } else {
          Meteor.loginWithPassword(email, password, function(err){
            if (err) {
              Bert.alert({
                title: 'There was a problem with signing you in',
                message: err,
                type: 'danger',
                style: 'growl-top-right',
                icon: 'fa-music'
              });
            } else {
              browserHistory.push('/posts');
            }
          });
        }
      });
    } else {
      Bert.alert({
        title: 'Your passwords do not match',
        message: 'Please make sure your passwords are the same',
        type: 'info',
        style: 'growl-top-right',
        icon: 'fa-music'
      });
    }

    // $('h2').tooltip();


    // console.log('123');
  }

  render() {
    return(
      <div>
        <Header />
        <div className="container">
          <h2 data-toggle="tooltip" data-placement="top" title="Some tooltip text!">Sign up</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
