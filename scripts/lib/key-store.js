

// look for api key in query arg "key". return FALSE if not found
function keyFromQuery(){
  if( document.location.search !== "" ){
    var re = /key=([^\/]+)\/?/;
    var m = document.location.search.match(re);
    return m[1]
  }
  return false;
}
