import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from '../../ui/pages/Home.jsx';

let auth = Meteor.userId();

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(
    routes, document.getElementById('main')
  );
});










// import React from 'react';
//
// export default (props) => {
//   return(
//     <div>
//       {props.children}
//     </div>
//   );
// }
