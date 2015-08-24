var
  React = require('react')
;

/* FilterField -- Input field for filtering projects */
var FilterField = React.createClass({

  onKeyPress: function(evt){
    if( this.props.isShortcutKey && this.props.isShortcutKey(evt) ){
      evt.preventDefault();
      this.props.handleShortcutKey && this.props.handleShortcutKey(evt.key, evt);
    }
  },

  onChange: function(evt){
    this.props.filterProjects(evt.target.value);
  },

  render: function() {
    var inputProps = {
          type: "text",
          id: "filter",
          name: "search",
          onChange: this.onChange,
          autoFocus: true,
          onKeyPress: this.onKeyPress,
          placeholder: "Start typing project name.."
    };
    return (
      <div id="filter-wrap">
        <label ref="filterField" htmlFor="filter">Filter Projects: </label>
        <input {...inputProps} />
      </div>
    );
  },

});

module.exports = FilterField;