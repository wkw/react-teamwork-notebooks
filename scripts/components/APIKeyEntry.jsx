var
  React = require('react'),
  Bookmarklet = require('./Bookmarklet.jsx')
;

var ReactPropTypes = React.PropTypes;


/* APIKeyEntry -- form to enter API Key */
var APIKeyEntry = React.createClass({

  propTypes: {
    handleKeyUpdate: ReactPropTypes.func.isRequired,
    checkApiKey: ReactPropTypes.func.isRequired
  },

  getInitialState: function() {
    return { errorMessage: "" }
  },


  handleSubmit: function(evt){

    evt.preventDefault();

    var error = this.refs.error.getDOMNode();
    var key = this.refs.apikey_field.getDOMNode().value;

    $(error).hide();

    // check key validity, pass success and fail callbacks.
    this.props.checkApiKey(key,
      function success(){

        // send key to TeamworkNotebooks component
        this.props.handleKeyUpdate(key);

        // and show bookmarklet widget
        var Marklet = React.render(
          <Bookmarklet apiKey={key} />,
            document.getElementById('bookmarklet')
        );
      }.bind(this),

      function fail(xhr, status, txtStatus){

        this.setState({errorMessage: "ERROR: " + txtStatus});
        $(error).fadeIn();

      }.bind(this)
    );
  },


  render: function() {
    return (
      <div id="key-entry-wrap">
        <p>
          Here, let me help you...
          Follow <a href="http://developer.teamwork.com/enabletheapiandgetyourkey" target="_blank">these instructions</a> then enter the key below
        </p>

        <form onSubmit={this.handleSubmit}>
          <input ref="apikey_field" placeholder="Teamwork API Key" autoFocus={true}/>
        </form>
        <h3 className="error" ref="error">{this.state.errorMessage}</h3>
      </div>
    );
  }
});


module.exports = APIKeyEntry;
