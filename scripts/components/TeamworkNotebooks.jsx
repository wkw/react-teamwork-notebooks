/**
 * @TODO
 *
 * - Don't keep separate list of filtered projects. Filter on the fly in render.
 *    could move the filtering down to the ProjectsTable but we need to modify notebook visibility
 *    when the filter results result in a set of one items at which point the visibility flag of
 *    the notebook is modified. So question is whether the data mutations should be happening in
 *    that child component, or best centralized in Ÿber-parent component.
 *
 */

var
  React         = require('react'),
  TWApi         = require("../lib/tw-api.js"),
  APIKeyEntry   = require('./APIKeyEntry.jsx'),
  ProjectsTable = require("./ProjectsTable.jsx"),
  ErrorMessage  = require("./ErrorMessage.jsx"),
  FilterField   = require("./FilterField.jsx"),
  HintsBox      = require("./HintsBox.jsx"),
  KeyboardShortcutsMixin  = require("../mixins/keyboardShortcuts.js")
;


/* TeamworkNotebooks -- Main Component*/
var TeamworkNotebooks = React.createClass({

  propTypes: {
    //{company: , key: }
    credentials: React.PropTypes.object.isRequired
  },

  mixins: [KeyboardShortcutsMixin],

  getDefaultProps: function(){
    return {
      notebooks_cache : {}
    }
  },

  getInitialState: function() {
    return {
      filterText : "",
      filteredProjects : [],
      projects: [],
      notebooks_cache : [],
      credentials: this.props.credentials,
      appWasRunning: false,
      hints : null,
      isLoading: true
    }
  },

  componentWillMount: function() {
    var creds = this.state.credentials;
    if( creds.key ){
      this.loadProjects();
    }else{
      this.setState({isLoading: false})
    }

  },

  componentWillReceiveProps: function(nextProps) {
  },


  focusFilterField: function(){
   var fld = this.refs.filterField.refs.filterField.getDOMNode();
   fld.control.value = '';
   fld.focus();
  },

  componentDidUpdate: function (oprops, ostate) {
    if (ostate.credentials.key !== this.state.credentials.key) {
      console.log("--->%cKEY CHANGED in componentDidUpdate", "color:red");
      this.loadProjects();
    }
  },


  projectsReceived: function(projectList){
    this.setState({
      projects: projectList,
      filteredProjects: projectList,
      isLoading: false
    });
  },

  loadProjects: function() {

    if( this.state.credentials.key ){

      TWApi.set_credentials(this.state.credentials);

      TWApi.list_notebooks()
        .done(function(data, textStatus, jqXHR){
          this.projectsReceived(data.projects);
        }.bind(this))
          .fail(function(jqXHR, status, txtStatus){
              console.warn("List Notebooks Failed:%c%s", "color:red;font-weight:bold;", txtStatus);
          })
            .always(function(){
              // anything to be done here?
            }.bind(this));

    }else{
      this.setState({
        projects: projectList,
        filteredProjects: projectList,
        isLoading: false
      });
      console.log("--->Unable to load projects, no api key");
    }
  },

  noteBookReceived: function(data){
    if( data.STATUS === "OK" ){

      // make it visible since this originates from user action
      var notebook = data.notebook;
      notebook.visible = true;
      var notebooks = this.state.notebooks_cache;
      notebooks[notebook.id] = notebook;
      this.setState({notebooks_cache: notebooks});

    }else{
      console.warn("Notebook load failed: ", data);
    }
  },


  loadNotebook: function(id){
    console.log("-->%cLoad Notebook", "color:blue", id);
    TWApi.load_notebook(id)
      .done(this.noteBookReceived);
  },

  handleKeyUpdate: function(key){
    this.setApiKey(key);
    this.loadProjects();
  },

  setApiKey: function(newKey){
    var creds = this.state.credentials;
    creds.key = newKey;
    this.setState(creds); // this isn't forcing an update, so do the next line...
    return creds;
  },

  // return a deferred
  checkApiKey: function(key, successFunc, failFunc){
    TWApi.set_credentials(this.setApiKey(key));
    TWApi.authenticate()
      .done(successFunc)
      .fail(failFunc);
  },


  closeAllNotebooks: function(){
    var anyChanged = false;

    var notebooks = this.state.notebooks_cache.map(function(book,idx){
      if( book ){
        anyChanged = anyChanged || book.visible;
        book.visible = false;
        return book;
      }else{
        // this should never happen, but if it does, let's get some details
        console.warn("%cWARNING:%c undefined cached notebook %d", "color:red", "color:black", idx, notebooks)
      }
    },this);

    anyChanged && this.setState({notebooks_cache: notebooks});

  },

  isShortcutKey: function(evt) {
    var c = evt.key;
    return ['>'].indexOf(c) >= 0;
  },

  handleShortcutKey: function(keyChar, evt){
    // evt has been preventDefault'd already
    //console.log("Got shortcut key = %s", keyChar);
    var filtered = this.state.projects.filter(function(proj){
      return this.filterMatch(this.state.filterText, proj.name);
    }, this);

    if( filtered && filtered.length === 1 ){
      var url = "https://emn.teamwork.com/projects/" + filtered[0].id + "/overview";
      window.open(url, "_tw")
    }

    console.log("-->Filtered:", filtered);
  },


  filterMatch: function (filterText, projName){

    // modifies project name to allow for easier filtering.
    // if using in a prop, encode_it should be true
    function cleanProjName(projName) {
      var re = /^Maintenance - (.+)$/;
      return name = projName.replace(re, "$1").trim();
    }

    var needle = filterText.toLowerCase();
    return !!~cleanProjName(projName).toLowerCase().indexOf(needle);
  },

  // update state.filteredProjects when input field value changes
  filterProjects: function(val) {
    if( val.length !== 1 ){
      this.closeAllNotebooks();
    }

    var filtered = this.state.projects.filter(function(proj){
      return this.filterMatch(val, proj.name);
    }, this);

    if( filtered.length === 1 ){
      var notebooks = filtered[0].notebooks;
      for(var i=0; i<notebooks.length; i++){
        // this will trigger re-render
        this.toggleNotebookVisibility(true, notebooks[i].id);
      }
    }
    var newState = {
      hints : filtered.length === 1 ? "Enter \">\" key to jump to project on TeamWork" : null,
      filterText: val,
      filteredProjects : filtered
    };

    this.setState( newState );

  },


  toggleNotebookVisibility: function(showIt, id){

    var notebooks = this.state.notebooks_cache;

    if( notebooks[id] ){
      notebooks[id].visible = !notebooks[id].visible;
      this.setState({notebooks_cache: notebooks});

/*
      // showIt is null to toggle value
      if( showIt === null ){
        notebooks[id].visible = !notebooks[id].visible;
      }else if( notebooks[id].visible !== showIt ){
        notebooks[id].visible = showIt;
        this.setState({notebooks_cache: notebooks});
      }
*/

    }else{
      this.loadNotebook(id);
    }
  },

  listenKeys: function(evt){
    console.log("keypress: ", String.fromCharCode(evt.which));
  },

  render: function() {

    var projects;

    if( this.state.projects.length > 0 || this.state.isLoading ){

      var data = {
        projects : this.state.filteredProjects,
        notebooks_cache : this.state.notebooks_cache
      };

      var callbacks = {
        closeNotebook : this.toggleNotebookVisibility.bind(this,false),
        openNotebook  : this.toggleNotebookVisibility.bind(this,true),
        toggleNotebook  : this.toggleNotebookVisibility.bind(this,null)
      };

      var filterFieldProps = {
        ref: "filterField",
        filterProjects: this.filterProjects,
        isShortcutKey: this.isShortcutKey,
        handleShortcutKey: this.handleShortcutKey
      };

      return (
        <div id="NotebooksApp">
          <FilterField {...filterFieldProps} />
          <HintsBox id="hints-box">{this.state.hints}</HintsBox>
          <ProjectsTable data={data} callbacks={callbacks} />
        </div>
      );

    }else{

      var msg = "Missing Teamwork API Key."
      return (
        <div>
          <ErrorMessage msg={msg} />
          <APIKeyEntry handleKeyUpdate={this.handleKeyUpdate} checkApiKey={this.checkApiKey} />
        </div>
      )

    }

  }

});

module.exports = TeamworkNotebooks;