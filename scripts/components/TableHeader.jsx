var
  React = require('react')
;

/* ProjectHeader -- table row */
var TableHeader = React.createClass({
  render: function() {
    var cols = this.props.labels.map(function(label){
      return (
        <div className="col header" key={label}>
          {label}
        </div>
      );
    });

    return (
      <div className="row">{cols}</div>
    );
  }
});

module.exports = TableHeader;