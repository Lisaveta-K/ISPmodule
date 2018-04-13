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
        var multidomain_bulean;
        var subdomain_ouput;
        var subdomain_bulean;
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
              multidomain_bulean = "true";
          } else {
              multidomain_ouput = '';
              multidomain_bulean = "false";
          }
          if (json.ssllist[i].subdomains === 'true') {
              subdomain_ouput = subdomains;
              subdomain_bulean = "true";
          } else {
              subdomain_ouput = '';
              subdomain_bulean = "false";
          }

          item_name = json.ssllist[i].owner;
          //adding item
          $('.ssl-cert__list').append('<div class="ssl-cert__item" data-trust="'+ trust +'" data-multi="'+ multidomain_bulean +'" data-sub="' + subdomain_bulean +'"><div class="ssl-cert__image ssl-cert__image--' + item_name + '"></div><div class="ssl-cert__info"><h3>' + json.ssllist[i].name + '</h3><div class="ssl-cert__options">'+ trust_output + multidomain_ouput + subdomain_ouput +'</div><p>'+ note_output +'</p></div></div>');
        }
      });
    });

    function toggleMessage() {
      if ($('.ssl-cert__list').children(':visible').length == 0) {
        $('.ssl-cert__list').append('<div class="message"><h2>Не найдено сертификатов, соответствующих запросу</h2><p><a href="" class="filter-clear">Очистите фильтр</a>, и попробуйте ещё раз.</p>')
      } else {
        $('.message').remove();
      } 
    }

    $('#trust-level').change( function() {
        $('#use').val('default');
        $('.ssl-cert__item').each(function(index) {
          if ($('#checkbox-sub').is(":checked")) {
            if (($(this).data("trust") === $('#trust-level').val()) && ($(this).hasClass("sub"))) {
                $(this).show();
                $(this).addClass("selected");
            } else {
              $(this).hide();
              $(this).removeClass("selected");
            }
          } else if ($('#checkbox-multi').is(":checked")){
            if (($(this).data("trust") === $('#trust-level').val()) && ($(this).hasClass("multi"))) {
                $(this).show();
                $(this).addClass("selected");
            } else {
              $(this).hide();
              $(this).removeClass("selected");
            }
          } else if ($('#checkbox-sub').is(":checked") && $('#checkbox-multi').is(":checked")) {
              if (($(this).data("trust") === $('#trust-level').val()) && ($(this).hasClass("multi")) && ($(this).hasClass("sub"))) {
                $(this).show();
                $(this).addClass("selected");
            } else {
              $(this).hide();
              $(this).removeClass("selected");
            }
          } else {
            if ($(this).data("trust").toString() === $('#trust-level').val().toString()) {
                $(this).show();
                $(this).addClass("selected");
            }else{
              $(this).hide();
              $(this).removeClass("selected");
            }
          }
        });
        toggleMessage();
    });

    $('#use').change( function() {
        $('#trust-level').val('default');
        $('.ssl-cert__item').each(function(index) {
          if ($('#checkbox-sub').is(":checked")) {
            if (($(this).data("trust").toString() === $('#use').val().toString()) && ($(this).hasClass("sub"))) {
                $(this).show();
                $(this).addClass("selected");
            } else{ 
              $(this).hide();
              $(this).removeClass("selected");
            }
          } else if ($('#checkbox-multi').is(":checked")) {
              if (($(this).data("trust").toString() === $('#use').val().toString()) && ($(this).hasClass("multi"))) {
                  $(this).show();
                  $(this).addClass("selected");
              }else{
                $(this).hide();
                $(this).removeClass("selected");
              }
          } else if ($('#checkbox-sub').is(":checked") && $('#checkbox-multi').is(":checked")) {
              if (($(this).data("trust").toString() === $('#use').val().toString()) && ($(this).hasClass("multi")) && ($(this).hasClass("sub"))) {
                  $(this).show();
                  $(this).addClass("selected");
              }else{
                $(this).hide();
                $(this).removeClass("selected");
              }
          } else {
            if ($(this).data("trust").toString() === $('#use').val().toString()) {
                $(this).show();
                $(this).addClass("selected");
            }else{
              $(this).hide();
              $(this).removeClass("selected");
            }
          }
        });
        toggleMessage();
    });

    $( '#checkbox-sub').change(function() {
       $('.ssl-cert__item').each(function(index) {
              if ($('#checkbox-multi').is(":checked") && (($('#trust-level').val().toString() != "") || ($('#use').val().toString() != ""))) {
                if ($('#checkbox-sub').is(":checked")) {
                  if (($(this).data("sub").toString() === "true") && ($(this).hasClass("multi")) && ($(this).hasClass("selected"))) {
                    $(this).show();
                    $(this).addClass("sub");
                  } else {
                    $(this).hide();
                    $(this).removeClass("sub");
                    toggleMessage();
                  }
                } else {
                  if ($(this).hasClass("selected") && $(this).hasClass("multi")) { 
                    $(this).show() 
                    $(this).removeClass("sub");
                  } else {
                    $(this).hide() 
                    $(this).removeClass("sub");
                    toggleMessage();
                  }
                }
            } else if (($('#trust-level').val().toString() != "") || ($('#use').val().toString() != "")) {
              if ($('#checkbox-sub').is(":checked")) {
                if (($(this).data("sub").toString() === "true") && ($(this).hasClass("selected"))) {
                  $(this).show();
                  $(this).addClass("sub");
                } else {
                  $(this).hide();
                  $(this).removeClass("sub");
                }
              } else {
                if ($(this).hasClass("selected")) { 
                  $(this).show() 
                  $(this).removeClass("sub");
                }
              }
            } else if ($('#checkbox-multi').is(":checked")) {
                if ($('#checkbox-sub').is(":checked")) {
                  if (($(this).data("sub").toString() === "true") && ($(this).hasClass("multi"))) {
                    $(this).show();
                    $(this).addClass("sub");
                  } else {
                    $(this).hide();
                    $(this).removeClass("sub");
                  }
                } else {
                  if ($(this).hasClass("multi")) { $(this).show() }
                  $(this).removeClass("sub");
                }
            } else {
              if ($('#checkbox-sub').is(":checked")) {
                  if ($(this).data("sub").toString() === "true") {
                    $(this).show();
                    $(this).addClass("sub");
                  } else {
                    $(this).hide();
                    $(this).removeClass("sub");

                  }
              } else {
                $(this).show();
                $(this).removeClass("sub");
              }
            }
        });
       toggleMessage();
    });


  $( '#checkbox-multi').change(function() {
       $('.ssl-cert__item').each(function(index) {
            if ($('#checkbox-sub').is(":checked") && (($('#trust-level').val().toString() != "") || ($('#use').val().toString() != ""))) {
                if ($('#checkbox-multi').is(":checked")) {
                if (($(this).data("multi").toString() === "true") && ($(this).hasClass("sub")) && ($(this).hasClass("selected"))) {
                  $(this).show();
                  $(this).addClass("multi");
                } else {
                  $(this).hide();
                  $(this).removeClass("multi");
                  toggleMessage();
                }
              } else {
                if ($(this).hasClass("sub") && ($(this).hasClass("selected"))) { 
                  $(this).show() 
                  $(this).removeClass("multi");
                } else {
                  $(this).hide();
                  $(this).removeClass("multi");
                  toggleMessage();
                }
              }
            } else if (($('#trust-level').val().toString() != "") || ($('#use').val().toString() != "")) {
              if ($('#checkbox-multi').is(":checked")) {
                if (($(this).data("multi").toString() === "true") && ($(this).hasClass("selected"))) {
                  $(this).show();
                  $(this).addClass("multi");
                }else{
                  $(this).hide();
                  $(this).removeClass("multi");
                }
              } else {
                if ($(this).hasClass("selected")) { 
                  $(this).show() 
                  $(this).removeClass("multi");
                }
              }
            } else if ($('#checkbox-sub').is(":checked")) {
              if ($('#checkbox-multi').is(":checked")) {
                if (($(this).data("multi").toString() === "true") && ($(this).hasClass("sub"))) {
                  $(this).show();
                  $(this).addClass("multi");
                }else{
                  $(this).hide();
                  $(this).removeClass("multi");
                }
              } else {
                if ($(this).hasClass("sub")) { $(this).show() }
                $(this).removeClass("multi");
              }
            } else {
              if ($('#checkbox-multi').is(":checked")) {
                  if ($(this).data("multi").toString() === "true") {
                    $(this).show();
                    $(this).addClass("multi");
                  } else {
                    $(this).hide();
                    $(this).removeClass("multi");
                  }
              } else {
                $(this).show();
                $(this).removeClass("multi");
              }
            }
        });
       toggleMessage();
    });


    $('.filter-clear').click(function(event) {
        event.preventDefault();
        $('select').val('default');
        $( '#checkbox-sub').attr('checked', false);
        $( '#checkbox-multi').attr('checked', false);
        $( '.ssl-cert__item').each(function(index) {
            $(this).show();
        });
        toggleMessage();
    });
  }
};

})(jQuery);
