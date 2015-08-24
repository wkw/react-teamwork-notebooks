var
  React = require('react')
;

/* TeamworkLink - create a link to a teamwork.com Project, Notebook, etc. */
var TeamworkLink = React.createClass({

  propTypes: {
    clickHandler: React.PropTypes.func,
    className: React.PropTypes.string,
    path:  React.PropTypes.string.isRequired,
    title: React.PropTypes.string
  },

  render: function() {

    var base = "https://emn.teamwork.com/";
    var props = this.props;

    return (
      <a
        href={base+props.path}
        className={props.className}
        onClick={props.clickHandler}
        target="_blank"
        title={props.title} >
          {this.props.children}
      </a>
    );
  }
});

module.exports = TeamworkLink;