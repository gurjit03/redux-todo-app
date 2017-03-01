var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route, IndexRoute, hashHistory} = require('react-router');

// Load the foundation css for the component
require('style!css!foundation-sites/dist/css/foundation.min.css')
$(document).foundation();

// App CSS
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <h1>Final Boilerplate application</h1>,
  document.getElementById('app')
);

require('react-todo-example');
