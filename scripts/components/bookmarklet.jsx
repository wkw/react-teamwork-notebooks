var
  React = require('react'),
  makeBookmarklet = require('../lib/utils.js').makeBookmarklet
;

var ReactPropTypes = React.PropTypes;


/* Bookmarklet -- show a bookmarklet pre-configured for the supplied apiKey */
var Bookmarklet = React.createClass({

  propTypes: {
    apiKey: ReactPropTypes.string.isRequired,
  },

  render: function() {
    var base = window.location.origin + window.location.pathname;
    console.log("-->BM Base", base);
    var marklet = makeBookmarklet(base, this.props.apiKey);
    var url = base + "?key=" + this.props.apiKey;

    if(!marklet){
      return null;
    }

    return (
      <div>
        <p>Drag the link to your bookmarks bar</p>
        <a href={marklet} ref="marklet" title="Drag me to your bookmarks bar">TW-Notebooks</a>
        <p>Non-Bookmarklet URL: <a href={url} title={url} target="_blank">Click Me!</a></p>
      </div>
    );
  }
});

module.exports = Bookmarklet;