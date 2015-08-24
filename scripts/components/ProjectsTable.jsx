var
  React       = require('react'),
  ProjectRow  = require('./ProjectRow.jsx'),
  TableHeader = require('./TableHeader.jsx')
;

/* ProjectsTable -- table of all projects, notebooks. */
var ProjectsTable = React.createClass({

  propTypes: {
      // see component <TeamworkNotebooks>
    data: React.PropTypes.object.isRequired,
    callbacks: React.PropTypes.object.isRequired
  },

  render: function() {

    // move "maintenance - " to end of project name
    function displayName(projName) {
      var re = /^Maintenance - (.+)$/;
      return projName.replace(re, "$1" + ' - Maintenance');
    }

    var projects = this.props.data.projects;
    var onlyOneProj = projects.length === 1; // figure out lifecycle method for this check
                                             // it needs to invoke ajax retrieval and setState

    function getProjectRows(project){
      var rowProps = {
        key: "row-"+project.id,
        name: displayName(project.name),
        id: project.id,
        notebooks: project.notebooks,
        notebooks_cache: this.props.data.notebooks_cache,
        callbacks: this.props.callbacks
      };

      return (
        <ProjectRow {...rowProps}/>
      );
    }

    var rows = projects.map(getProjectRows, this);

    var labels = ["Project Name", "Notebooks"];

    return (
      <div id="projects-table">
        <TableHeader key_id="table-header" labels={labels} />
          {rows}
      </div>
    )
  }
});

module.exports = ProjectsTable;
