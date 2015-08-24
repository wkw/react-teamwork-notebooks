var
  React        = require('react'),
  TeamworkLink = require('./TeamworkLink.jsx')
;

/* NotebookLink - create anchor element for a notebook */
var NotebookLink = React.createClass({

  propTypes: {
    notebook: React.PropTypes.object,
    callbacks: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      visible : false,
    }
  },

  clickHandler: function(evt){
    evt.preventDefault();
    this.props.callbacks.toggleNotebook(this.props.notebook.id);
  },

  render: function() {

    var notebook = this.props.notebook;

    var props = {
      path: "notebooks/"+notebook.id,
      className: "tw-nb-link",
      clickHandler: this.clickHandler,
      title: "View this notebook"
    }
    return (
      <div>
        <TeamworkLink {...props}>
          {notebook.name}
        </TeamworkLink>
      </div>
    );
  }
});

module.exports = NotebookLink;