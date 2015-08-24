/**
 * Helpers for Accessing Teamwork API
 *
 */

var _CREDS = {
  company: "emn",
  key    : null,
};

/**
 * Call teamwork api endpoint
 *
 * @param string action - the endpoint. E.g., /projects.json
 * @return jquery Deferred - the result of $.ajax
 * @since 0.1
 */
var call_teamwork = function (action, optional_creds){

  var c = optional_creds || _CREDS;

  return $.ajax({
  	url: 'https://' + c.company + '.teamwork.com/' + action,
  	headers: {"Authorization": "BASIC " + window.btoa(c.key + ":xxx")}
  });

}

// returns Ajax deferred
var list_notebooks = function (){
  return call_teamwork("notebooks.json");
}

// returns Ajax deferred
var load_notebook = function (id){
  return call_teamwork("notebooks/" + id + ".json");
}

// returns Ajax deferred
var authenticate = function (){
  return call_teamwork("authenticate.json");
}

var set_credentials = function(newCreds){
  if( newCreds.company ){
    _CREDS.company = newCreds.company;
  }

  if( newCreds.key ){
    _CREDS.key = newCreds.key;
  }
}


module.exports = function TeamworkAPI(credentials = {}) {

  set_credentials(credentials);

};

module.exports.list_notebooks  = list_notebooks;
module.exports.load_notebook   = load_notebook;
module.exports.authenticate     = authenticate;
module.exports.set_credentials = set_credentials;
