var
  React = require('react')
;


/* CloseButton - when clicked, calls handler provided in props with component id */
var CloseButton = React.createClass({
  handleClick: function(evt){
    this.props.closeHandler(this.props.id);
  },

  render: function() {
    return (
      <div className="close-control" onClick={this.handleClick}>[ Close ]</div>
    );
  }
});



module.exports = CloseButton;
