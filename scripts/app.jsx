'use strict';

var
  React = require('react'),
  TeamworkNotebooks = require('./components/TeamworkNotebooks.jsx');

window.React = React;


/**
 * look for api key in query arg "key". return FALSE if not found
 */
function keyFromQuery() {
  if( document.location.search !== "" ){
    var re = /key=([^\/]+)\/?/;
    var m = document.location.search.match(re);
    return m ? m[1] : false;
  }

  return false;
}


/**
 * Look for API Key in query arg or Local Storage.
 *
 * @return string | FALSE - return key if found in expected locations, or false otherwise
 */
function getApiKey() {
  // future version will check Local Storage
  return keyFromQuery();
}


var credentials = {
  company: "emn",
  key: null
};
credentials.key = getApiKey();

var App = React.render(
  <TeamworkNotebooks credentials={credentials}/>,
    document.getElementById('container')
);
