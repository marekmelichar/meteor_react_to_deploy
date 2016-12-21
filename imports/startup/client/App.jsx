
import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createHistory, useBasename } from 'history';

import Home from '../../ui/pages/Home.jsx';
import Signup from '../../ui/pages/Signup.jsx';
import PostsList from '../../ui/pages/PostsList.jsx';
import PostFull from '../../ui/pages/PostFull.jsx';
import TagFull from '../../ui/pages/TagFull.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';

let auth = Meteor.userId();

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/posts" component={PostsList} />
    <Route path="/posts/:postId" component={PostFull} />
    <Route path="/tags/:tagId" component={TagFull} />
    <Route path="/*" component={NotFound} />
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(
    routes, document.getElementById('react')
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
