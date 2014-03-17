/*
	demo.js
	JavaScript support code for the Style Sheet switcher code from
	http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
	http://www.thesitewizard.com/javascripts/cookies.shtml
	Copyright 2008 by Christopher Heng. All rights reserved.
	http://www.thesitewizard.com/
*/
var style_cookie_name = "demo_theme" ;
var style_cookie_duration = 1 ;	// set to 1 for this demo
function set_cookie ( cookie_name, cookie_value, lifespan_in_days, valid_domain )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name + "=" + encodeURIComponent( cookie_value ) + "; max-age=" + 60 * 60 * 24 * lifespan_in_days + "; path=/" + domain_string ;
}
function get_cookie ( cookie_name )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match ( '(^|;)[\s]*' + cookie_name + '=([^;]*)' );
        return decodeURIComponent ( cookie_value[2] ) ;
    }
    return '' ;
}

function switch_style ( css_title )
{
  // You may use this script on your site free of charge provided you
  // do not remote this notice or the URL below.
  // http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
  // Please see the above article for explanations on how to use and
  // a demo.
  var i, link_tag ;
  for (i = 0, link_tag = document.getElementsByTagName("link") ; i < link_tag.length ; i++ ) {
    if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) && link_tag[i].title) {
      link_tag[i].disabled = true ;
      if (link_tag[i].title == css_title) {
        link_tag[i].disabled = false ;
      }
    }
    set_cookie( style_cookie_name, css_title, style_cookie_duration );
  }
}
function set_style_from_cookie()
{
  var css_title = get_cookie( style_cookie_name );
  if (css_title.length) {
    switch_style( css_title );
  }
}
function onload_handler()
{
	framebreaker();
	set_style_from_cookie();
}