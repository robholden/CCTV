/*
jQuery CCTV - v2
Copyright (c) 2013 Robert Holden
Dual licensed under the MIT license and GPL license.
*/

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "cctv",
    defaults = {
      code: 0,
			lockout: true
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
      this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
        this.startCCTV();
				
				if(this.settings.lockout == true)
				{
        	this.secureCCTV();
				} 
      }

      Plugin.prototype = {
        init: function () {
          // Create CCTV Elements
					$(this.element).append('<div id="cctv-holder"><div id="blinker-holder"><span id="blinker"></span></div><div id="cctv-body"></div><div id="cctv-head"></div></div>');
					
					if(this.settings.lockout == true)
					{
						$(this.element).append('<section id="alarm"><section id="unlock-code"><h3>Hmm, looks like you\'re being nosy...</h3><h4>Enter the unlock code:</h4><input class="code-input" id="code1" autocomplete="off" size="1" maxlength="1" /><input class="code-input" id="code2" autocomplete="off" size="1" maxlength="1" /><input class="code-input" id="code3" autocomplete="off" size="1" maxlength="1" /><input class="code-input" id="code4" autocomplete="off" size="1" maxlength="1" /><input class="code-input" id="code5" autocomplete="off" size="1" maxlength="1" /><a href="#" id="alarm-code-submit">Unlock</a></section></section>');
					}
        },
        startCCTV: function () {    
          var idleTime = 0;                   
          
          //Increment the idle time counter every second.
          var idleInterval = setInterval(timerIncrement, 1000);
          
          function timerIncrement() {
            if (idleTime > 3) {
              $('#blinker').removeClass('on');
            }
            if (idleTime === 0) {
              $('#blinker').addClass('on'); 
            }
            idleTime++;
          }
          
          //Zero the idle timer on mouse movement.
          $(this).mousemove(function (e) {
            idleTime = 0;
          });
          
          $(window).scroll(function(e) {    
            var pageY = window.pageYOffset;   
            follow(pageY);
            
            idleTime = 0;
          }); 
          
          $(window).mousemove(function(e) {   
            var pageY = window.pageYOffset;   
            follow(pageY);
            
            idleTime = 0;
          });   
          
          function follow(posY) {
            var camera = $('#cctv-head'); 
            var blinker = $('#blinker-holder');     
            
            var height = $(document).height();
            
            var angle = (posY / (height/80));
            
            if(angle < -55){ 
              angle = -55;
            }
            
            camera.css({
              'transform': 'rotate('+-angle+'deg)'              
            });
            blinker.css({
              'transform': 'rotate('+-angle+'deg)'            
            });                           
          }           
        },
        secureCCTV: function () { 
          var elem = this.element;
          var code = this.settings.code;
          
          $(elem).on('contextmenu', function(e) { 
            systemBreach();
            return false;
          }); 
                                      
					$('.code-input').keydown(function(e)
					{                            
						$(this).removeClass('bad');
						var key = e.charCode || e.keyCode || 0;
						
						if (key == 8 || key == 37 || key == 39){
							if($(this).val().length == 0 || key == 37)
							{
								$(this).prev('input').focus();  
							}
							if(key == 39){
								$(this).next('input').focus();  
							}
						}      
						
						if (e.keyCode == 13)
						{
							if(checkCode(code) == true){
								systemSecure();
							}
							
							else 
							{
								$('.code-input').blur(); 
								$('.code-input').addClass('bad');  
								$('.code-input').val('');
							} 
						}                           
						
						// allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
						// home, end, period, and numpad decimal
						return (
							key == 8 || 
							key == 9 ||
							key == 46 ||
							key == 110 ||
							key == 190 ||
							(key >= 35 && key <= 40) ||
							(key >= 48 && key <= 57) ||
							(key >= 96 && key <= 105)); 
						
					});
				
					$('.code-input').keypress(function(e) 
					{
						var inp = String.fromCharCode(event.keyCode);
						if (/^[0-9]+$/.test(inp)) 
						{
							$(this).next('input').focus(); 
						}
					});  
					
					$('.code-input').keyup(function(e){
						setInterval(function(){
							checkCode(code);
						},250);														
					});
					
					
					$('#alarm-code-submit').click(function(e) {
						if(checkCode(code) == true)
						{
							systemSecure();
						} 
						
						else 
						{
							$('.code-input').addClass('bad');  
							$('.code-input').val('');     
							$(this).removeClass('good');
						} 
						
						return false; 
					});                   
					
					function checkCode(pass) {
						var code = '';
						var code1 = $('#code1').val();
						var code2 = $('#code2').val();
						var code3 = $('#code3').val();
						var code4 = $('#code4').val();
						var code5 = $('#code5').val();
						
						if(code1.length == 1) {code=code+code1;}
						if(code2.length == 1) {code=code+code2;}
						if(code3.length == 1) {code=code+code3;}
						if(code4.length == 1) {code=code+code4;}
						if(code5.length == 1) {code=code+code5;}
						
						if(code.length == 5)
						{
							$('#alarm-code-submit').addClass('good');
							
							if((pass.toString()).length != 5)
							{
								return true;
							}
							else
							{
								if(pass == code)
								{
									return true;
								}
								else
								{
                  //$('#alarm-code-submit').removeClass('good');              
                  return false;
                }
              }             
            }
            
            else 
            {
              $('#alarm-code-submit').removeClass('good');
              
              return false;
            }
          }
          
          function systemBreach(){
            $('#alarm').addClass('on');
            $('#code1').focus();
          }
          
          function systemSecure(){  
            $('.code-input').blur();
            $('.code-input').val('');
            $('.code-input').removeClass('bad');
            $('#alarm').removeClass('on');
          }
        }
      };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
      return this.each(function() {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
          $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
        }
      });
    };

  })( jQuery, window, document );
