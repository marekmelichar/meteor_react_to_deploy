import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Logo from './Logo.jsx';
import IconPencil from './IconPencil.jsx';
import Modal from 'react-modal';
import { Posts } from '../../api/Posts.js';

// import LoginButtons from './LoginButtons.jsx';

export default class Header extends Component {
  constructor () {
    super();

    this.state = {
      open: false,
      title: '',
      content: '',
      tags: []
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addPost = this.addPost.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  logout(event) {
    event.preventDefault();

    Meteor.logout((er) => {
      if (er) {
        console.log(er);
      } else {
        browserHistory.push('/');
      }
    });
  }

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  addPost(event){
    event.preventDefault();

    if (this.state.title !== '' && this.state.content !== '') {
      Meteor.call('posts.insert', this.state.title, this.state.content, this.state.tags);

      this.setState({
        title: '',
        content: ''
      });

      return this.closeModal();
    } else {
      console.log('you have to provide title and content');
    }
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

  handleTags(event) {
    let arr = [];
    let tagss = {
      tags: (event.target.value).split( ',' ).map( ( string ) => {
                  return arr.push(string.trim());
                })
    }

    // console.log(arr);

    return this.setState({
      tags: arr
    });

  }

  render() {
    let nav;

    if (Meteor.userId()) {
      nav = (
        <nav className="nav nav-pills navbar-right">
          <ul>
            <li role="presentation"><a onClick={this.logout.bind(this)}>Odhlásit se</a></li>
          </ul>
        </nav>
      );
    } else {
      nav = (
        <nav className="nav nav-pills navbar-right">
          <ul>
            <li role="presentation"><a href="/">Domů</a></li>
          </ul>
        </nav>
      );
    }

    // console.log(this.state.tags);

    return (
      <header className="header container-fluid">
        <Logo />
        <button onClick={this.openModal} type="button" className="btn btn-custom">Nová poznámka<IconPencil fill="#FFF" /></button>
        {nav}

        <Modal
          isOpen={this.state.open}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <button className="closeModal" onClick={this.closeModal}>X</button>
          <div className="container">
            <h2 data-toggle="tooltip" data-placement="top" title="Some tooltip text!">Nová poznámka</h2>
            <form onSubmit={this.addPost}>
              <div className="form-group">
                <label htmlFor="title">Nadpis</label>
                <input type="title" className="form-control" id="title" placeholder="Nadpis" onChange={this.handleTitle} />
              </div>
              <div className="form-group">
                <label htmlFor="body">Poznámka</label>
                <input type="body" className="form-control" id="body" placeholder="Poznámka" onChange={this.handleContent} />
              </div>
              <div className="form-group">
                <label htmlFor="body">Štítky</label>
                <input type="body" className="form-control" id="tags" placeholder="Štítky" onChange={this.handleTags} />
              </div>
              <button type="submit" className="btn btn-default">Přidat poznámku</button>
            </form>
          </div>
        </Modal>
      </header>
    );
  }
}



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
