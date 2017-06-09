(function($){
	$.fn.tmClip = function(options){
		var opts = $.extend({},$.fn.tmClip.method,$.fn.tmClip.defaults,options);
		return this.each(function(){
			opts.init($(this),opts);
		});
	};
	var first = false,clicked = false;
	$.fn.tmClip.method = {
		init : function($this,opts){
			var $box = $this;
			var boxWidth = $box.width();//容器的宽度 400
			var boxHeight = $box.height();//容器的高度
			var amount = opts.amount;//需要平均分配的数量
			var width = parseInt(boxWidth/amount);//每一个小div的宽度 80
			var height = parseInt(boxHeight/amount);//每一个小div的高度
			var html = opts.content;
			var y = 0;
			$this.css({position:"relative"});
			for(var x=0;x<boxWidth;x= x+width){
				var $animateItems = $('<div class="tmui-animate-items" style="clip: rect('+y+'px, '+(x+width)+'px, '+(y+height)+'px, '+x+'px)">'+html+'</div>');
				$animateItems.width(boxWidth).height(boxHeight).css({
					position: 'absolute',
					zIndex: 1,
					background: '#4F9CC7'
					
				});
				$animateItems.appendTo($box);
				if(x == (boxWidth - width)){
					y = y+height;
					x = - width;
				}
				if(y==boxHeight)break;
			};	
			$this.on("click",function(){
				if(clicked === false) {
					clicked = true;
					$('.tmui-animate-items',$this).each(function() {
						var v = opts.rand(120, 90),
							angle = opts.rand(80, 89),
							theta = (angle * Math.PI) / 180,
							g = -9.8; 
						var speed = opts.speed;
						var self = $(this);
						var t = 0,
							z, r, nx, ny,
							totalt =  15;
						var negate = [1, -1, 0],
							direction = negate[ Math.floor(Math.random() * negate.length) ];
						var randDeg = opts.rand(-5, 10), 
							randScale = opts.rand(0.9, 1.1),
							randDeg2 = opts.rand(30, 5);
						var color = $(this).css('backgroundColor').split('rgb(')[1].split(')')[0].split(', '),
							colorR = opts.rand(-20, 20),
							colorGB = opts.rand(-20, 20),
							newColor = 'rgb('+(parseFloat(color[0])+colorR)+', '+(parseFloat(color[1])+colorGB)+', '+(parseFloat(color[2])+colorGB)+')';
						$(this).css({
							'transform' : 'scale('+randScale+') skew('+randDeg+'deg) rotateZ('+randDeg2+'deg)', 
							'background' : opts.getRandomColor(),
							"borderRadius":opts.rand(0,100)
						});
						z = setInterval(function() { 	
							var ux = ( Math.cos(theta) * v ) * direction;
							var uy = ( Math.sin(theta) * v ) - ( (-g) * t);
							nx = (ux * t);
							ny = (uy * t) + (speed * (g) * Math.pow(t, 2));
							$(self).css({'bottom' : (ny)+'px', 'left' : (nx)+'px'});
							t = t + 0.10;
							if(t > totalt) {
								clicked = false;
								first = true;
								clearInterval(z);
								$this.css({'top' : 100, 'transition' : ''});
								$('.tmui-animate-items',$this).css({borderRadius:0,'opacity' : '1', 'transition' : 'none', 'background-color' : opts.getRandomColor(),
								'-webkit-transition': '-webkit-transform 1.4s ease-in, background 1.3s ease-in',
								'transition': 'transform 1.4s ease-in, background 1.3s ease-in'	,
								'transform' : 'none',
								'bottom' : '0',
								'left' : '0'
								});
							}
						}, 17);
					});
				}
			});
		},

		rand : function(min, max){
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		getRandomColor : function() {
			return '#' + (function(h) {
				return new Array(7 - h.length).join("0") + h;
			})((Math.random() * 0x1000000 << 0).toString(16));
		}
	};

	$.fn.tmClip.defaults = {
		content:"<img src=\"img3.jpg\">",
		amount:5,
		speed:0.1
	}

})(jQuery)