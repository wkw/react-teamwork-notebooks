var
  React = require('react')
;

/* ErrorMessage -- Generic error msg display. Uses raw html injection,
   so avoid displaying anything recieved from outside this script */
var ErrorMessage = React.createClass({

  getDefaultProps: function(){
    return {
      msg: "Missing <code>msg</code> property in component <code>ErrorMessage</code>."
    }
  },

  render: function() {
    return (
      <div className="error">
        <h2><span>&#9883;</span> Error:</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.msg}}></div>
      </div>
    );
  }
});

module.exports = ErrorMessage;