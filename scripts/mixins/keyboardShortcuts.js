
var KeyboardShortcuts = {

  componentWillMount: function() {

    var shortcutKeys = function(evt){
      this.focusFilterField();
      /*
            if( evt.target  == document.body ){
              switch( String.fromCharCode(evt.which) ){
                case 'f': case 'F':
                  //evt.preventDefault();
                  this.focusFilterField();
              }
            }
      */
    }.bind(this);

    this.keyHandler = shortcutKeys;

    // when input field gets focus, remove our keypress listener
    $("body").on("focus", "input", function kbShortcutMXFocus(evt){
      //console.log("%c-->Focus", "color:green");
     $( document ).off("keypress",  this.keyHandler);
    }.bind(this));

    // when input field blurs, add our keypress handler
    $("body").on("blur", "input", function kbShortcutMXBlur(evt){
      //console.log("%c-->Blur", "color:orange");
      $( document ).on("keypress",  this.keyHandler);
    }.bind(this));

  },

  componentWillUnmount : function() {
    $( document ).off("keypress",  this.shortcutKeys);
  }

};


module.exports = KeyboardShortcuts;