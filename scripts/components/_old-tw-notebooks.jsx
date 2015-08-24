var
  React = require('React'),
  TeamworkNotebooks = require('./app.jsx')
;

/**
 * Teamwork Project Management Notebooks Viewer
 *
 * Use Teamwork (TW) api to quickly jump to the notebooks for any project
 * and view their contents
 */




/* ========================================================================= *
 * ===================      ReactJS  Components          =================== *
 * ========================================================================= */





/* Update app props */
function reRenderApp(nextProps){
  App.setProps( nextProps );
}




/**
 * Globals -- our cache and app reference
 */
var _Cache = window._Cache = {projects : [], notebooks : {}};
var App = null;



/**
 * Main
 *
 * Load notebooks/projects info and start App
 */
function main(){
  // check for api key
  if( ! _CREDS.key ){

    App = React.render(
      <TeamworkNotebooks projects={[]} />,
      document.getElementById('container')
    );

  }else{

    list_notebooks()
      .done(function(data, textStatus, jqXHR){

        console.log(data);
        _Cache.projects = data.projects;

        // support restarting app when API key was missing
        if( App ){
          React.unmountComponentAtNode(document.getElementById('container'));
        }

        App = React.render(
          <TeamworkNotebooks projects={data.projects} />,
          document.getElementById('container')
        );

      }.bind(this));
  }
}
//main();

module.exports = TeamworkNotebooks;