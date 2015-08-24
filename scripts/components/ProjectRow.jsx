var
  React        = require('react'),
  TeamworkLink = require('./TeamworkLink.jsx'),
  NotebookLink = require('./NotebookLink.jsx'),
  CloseButton  = require('./CloseButton.jsx')
;

var ReactPropTypes = React.PropTypes;

// render any notebooks which are "opened" (property visible == true)
function getOpenNotebooks(book){
  var cachedNotebooks = this.props.notebooks_cache;
  var nbid = book.id;
  if( cachedNotebooks && cachedNotebooks[nbid] && cachedNotebooks[nbid].visible ){
    return (
      <div className="notebooks-binder" key={nbid}>
        <CloseButton id={book.id} closeHandler={this.props.callbacks.toggleNotebook} />
        <div className="notebook-rings" />
        <div className="contents-wrap" dangerouslySetInnerHTML={{__html: cachedNotebooks[nbid].content}} />
      </div>
    );
  }
  return null; // no opened notebooks
}

// render a notebook link
function getNotebooks(book){
  return (
    <NotebookLink key={"proj-"+book.id} notebook={book} callbacks={this.props.callbacks} />
  );
}



// Render one project with Name linked to teamwork.com, and all notebooks for the project
var ProjectRow = React.createClass({

  propTypes: {
      // see: component <ProjectsTable>
    callbacks:  ReactPropTypes.object.isRequired,
    name:       ReactPropTypes.string.isRequired,
    id:         ReactPropTypes.string.isRequired,
    notebooks:  ReactPropTypes.array,
    notebooks_cache: ReactPropTypes.array
  },

  render: function() {

    var notebooks = this.props.notebooks.map(getNotebooks.bind(this));
    var openNotebooks = this.props.notebooks.map(getOpenNotebooks.bind(this));

    var linkProps = {
      callbacks: this.props.callbacks,
      className: "tw-project-link",
      path:  "projects/" + this.props.id + "/overview",
      title: "View project at Teamwork.com"
    };

    return (
      <div className="row project">
        <div className="col">
          <TeamworkLink {...linkProps}>
              {this.props.name}
          </TeamworkLink>
        </div>
        <div className="col">{notebooks}</div>
        {openNotebooks}
      </div>
    );
  }
});


module.exports = ProjectRow;