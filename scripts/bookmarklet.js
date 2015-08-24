;(function(window, undefined) {

  console.log("-->Panel loaded");
  var src_base = window.TW_WIDGET_HOST; // set by bookmarket for us

  var widgetId = "teamworkBookmarklet";
  var $ = null; // our scoped jQuery

  function keyFromQuery(){
    if( document.location.search !== "" ){
      var re = /key=([^\/]+)\/?/;
      var m = document.location.search.match(re);
      return m[1]
    }
    return false;
  }

  /*! =========== Bootstrap Code ========= */

  function main() {
    if( ! window.TW_WIDGET_INITIALIZED ){
      var widget = new Widget(widgetId);
      var div = document.body.children[0];
      document.body.insertBefore(widget.element, document.body.firstChild)
      $ = jQuery;

      $widget = $("#"+widgetId);
      var $tab = $("#tw_tab");
      if( $tab.length === 0 ){
        console.log("-->creating tab");
        $widget.append('<div id="tw_tab">Close</div>');
        $("#tw_tab").click(function(evt){
          $widget.slideUp();
        }.bind(this));
      }

      // bookmarklet has to set these for us.
      var key = window.TW_WIDGET_KEY;
      var host = window.TW_WIDGET_HOST;

      key = key ? "?key=" + key : '';
      // add iframe with TW utility
      var $iframe = $('<iframe />', {
          name: "TW_Frame",
          id:   "TW_Widget_FRAME",
          src: host + "/index.html" + key,
          width: "2000",
          height: "1200"
      }).appendTo($widget);
    }
    window.TW_WIDGET_INITIALIZED = true;
    openWidget();
    app($, window);
  }

  var Widget = function(id) {
    var el = document.getElementById(id);
    // check if our container exists
    if(el){
      this.element = el;
      return this;
    }

    this.element = document.createElement("div");
    this.element.id = id;
    //this.element.innerHTML = "<h1>Teamwork Bookmarklet</h1> click to hide";

    var that = this;
    //this.element.onclick = function() { that.element.style.display = "none"; };
    return this;
  };

  function openWidget(){
    $widget.slideDown();
  }

  function loadCss(url) {
    console.log("-->Loading Style: ", url);
    var el = document.createElement("link");
    el.type = "text/css";
    el.rel = "stylesheet";
    el.href = url;

    var head = document.getElementsByTagName("head")[0];
    head.appendChild(el);
  };

  function loadScript(url, onLoad) {
    onLoad = onLoad || false;
    var script = document.createElement("script");
    script.src = url;
    script.async = false;
    script.type = "text/javascript";
    if( onLoad ){
      script.onload = onLoad;
    }
    document.body.appendChild(script);
  };

  function init() {
    if( window.TW_WIDGET_INITIALIZED ){
      main();
      return;
    }
    loadCss(src_base + "css/main.css");

    // Look for jQuery

    if( !($ = window.jQuery) ){
      console.log("%c===================================", "color:white;background-color:red;");
      console.log("%c   ====== LOADING JQUERY =========  ", "color:red;font-weight:bold;");
      console.log("%c===================================", "color:white;background-color:red;");

      loadScript("//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", main);
    }else{
      $ = jQuery;
      main();
    }
  }

  function app($, window){
    console.log("-->Application called");
  };
  init();
})(window);//closure