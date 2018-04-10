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
        var dv = '<div class="ssl-cert__trust ssl-cert__trust--dv">DV</div>';
        var ov = '<div class="ssl-cert__trust ssl-cert__trust--ov">OV</div>';
        var ev = '<div class="ssl-cert__trust ssl-cert__trust--ev">EV</div>';
        var multidomain = '<div class="ssl-cert__trust ssl-cert__trust--multi">multidomain</div>';
        var subdomains = '<div class="ssl-cert__trust ssl-cert__trust--sub">subdomains</div>';
        var trust_output;
        var multidomain_ouput;
        var subdomain_ouput;
        var note_output;
        for (i = 0; i <= ssl_count; i++) {
          //Checking trust value for current item
          var trust = json.ssllist[i].trust;
          note_output = '';
          if ( trust === 'DV' ) {
                trust_output = dv;
                note_output = json.parametrs[0].note;
          } else if (trust === 'OV') {
                trust_output = ov;
                note_output = json.parametrs[1].note;
          } else {
                trust_output = ev;
                note_output = json.parametrs[2].note;
          }

          note_output = note_output.toString().replace(/,/g, '</p><p>');

          if (json.ssllist[i].multidomain === 'true') {
              multidomain_ouput = multidomain;
          } else {
              multidomain_ouput = '';
          }
          if (json.ssllist[i].subdomains === 'true') {
              subdomain_ouput = subdomains;
          } else {
              subdomain_ouput = '';
          }

          item_name = json.ssllist[i].owner;
          //adding item
          $('.ssl-cert__list').append('<div class="ssl-cert__item"><div class="ssl-cert__image ssl-cert__image--' + item_name + '"></div><div class="ssl-cert__info"><h3>' + json.ssllist[i].name + '</h3><div class="ssl-cert__options">'+ trust_output + multidomain_ouput + subdomain_ouput +'</div><p>'+ note_output +'</p></div></div>');
        }
      });
    });
  }
};

})(jQuery);
