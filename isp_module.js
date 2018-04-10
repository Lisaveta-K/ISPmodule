/**
 * @file
 * Attaches the behaviors for the isp_module.
 */

(function ($) {

Drupal.behaviors.isp_module = {
  attach: function (context, settings) {
    $(document).ready(function() {
      //Написать о пути установки модуля в ридми
      $.getJSON( Drupal.settings.basePath + 'sites/all/modules/custom/isp_module/ssl.json', function( json ) {
        var ssl_count = json.ssllist.length;
        var item_name;
        for (i = 0; i < json.ssllist.length; i++) {
          item_name = json.ssllist[i].name.substr(0, json.ssllist[i].name.indexOf(" "));
          $('.ssl-cert__list').append('<div class="ssl-cert__item"><div class="ssl-cert__image ssl-cert__image--' + item_name + '"></div><div class="ssl-cert__info"><h3>' + json.ssllist[i].name + '</h3></div></div>');
        }
      });
    });
  }
};

})(jQuery);
