var makeBookmarklet =function (url, api_key){
  if(!api_key){
    console.warn("Invalid api_key", api_key);
    return false;
  }
  var u = url + "js/bookmarklet.js?key=" + api_key;
  var js = "(function () {window.TW_WIDGET_KEY='" +api_key+"';window.TW_WIDGET_HOST='"+url+"';var jsCode = document.createElement('script');jsCode.setAttribute('src','"+u+"');document.body.appendChild(jsCode);  }());";
  return "javascript:" + escape(js);
}

module.exports = {
  makeBookmarklet: makeBookmarklet
}