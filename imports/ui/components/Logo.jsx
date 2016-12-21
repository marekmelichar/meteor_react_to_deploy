import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import IconNotes from './IconNotes.jsx';

export default class Logo extends Component {



render() {
  return(
    <div className="logo">
      <a href="/posts">
        <h3 className="heading">epoznamky.cz</h3>
        <span className="icon"><IconNotes fill="#2DB5CF" /></span>
      </a>

    </div>
  );
}

}
