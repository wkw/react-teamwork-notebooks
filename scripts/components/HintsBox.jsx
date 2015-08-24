var
  React = require('react')
;

var ReactPropTypes = React.PropTypes;

var HintsBox = React.createClass({
  render: function() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = HintsBox;