/*! cms 2018-03-13 */
!function(a){a.App=function(){this.config={serviceUrl:"/requests/service",loadedGalleries:{}}},a.App.prototype.init=function(){function a(){var a=$("#tc"),b=$("#age-limit"),c=1==a.length,d=1==b.length,e=$("#form-submit-btn"),f=!1;e.addClass("disabled").attr("disabled","disabled"),c&&d&&a.is(":checked")&&b.is(":checked")?f=!0:c&&!d&&a.is(":checked")?f=!0:!c&&d&&b.is(":checked")&&(f=!0),f&&e.removeClass("disabled").removeAttr("disabled")}this.config=$.extend(!0,this.config,jsVars),this.toggleNav(".nav-toggle"),this.toggleSubNav(".toggle-sub-nav"),this.toggleAccomSubNav(".sub-nav-toggle"),this.initNewsletterSignup("#news-signup-form"),this.initSlickSlider(".slider"),this.initFlexslider(".flexslider"),this.initSlickCarousel(".testimonial-carousel"),this.initCarousel(".gallery-carousel"),this.initPhotoswipe(".gallery-carousel a"),this.initShuffle("#shuffle"),this.initMap(),this.setHeaderContainer(),this.matchElmHeight(".quicklinks-descr"),this.initDatepicker("check-in"),this.initDateControl("date-control"),$(".scroll").on("click",function(a){a.preventDefault(),$("html, body").delay(100).animate({scrollTop:$("#main").offset().top-130},400)}),$(window).on("resize",function(){app.setHeaderContainer()}).trigger("resize"),$(".quicklinks-heading").hover(function(){var a=$(this).data("id");$("."+a).addClass("zoomImage")},function(a){var b=$(this).data("id");$("."+b).removeClass("zoomImage")}),$(".trigger-tc-modal").on("click",function(a){a.preventDefault(),$("#tc-modal").modal({backdrop:"static"}).on("hidden.bs.modal",function(a){$(window).scrollTop($("#tc").offset().top-500)}).modal("show")}),$("#tc, #age-limit").on("change",a),$(".accept-tc").on("click",function(b){b.preventDefault(),$("#tc").attr({disabled:!1,checked:!0}),a()})},a.App.prototype.setHeaderContainer=function(){$(window).width()<=991?$("header").find(".container").addClass("container-fs"):$("header").find(".container").removeClass("container-fs")},a.App.prototype.initDatepicker=function(a,b){a=document.getElementById(a);var c={field:a,format:"DD/MM/YYYY",minDate:new Date};if(b=$.extend(!0,c,b),a){$(a).attr({autocomplete:"off",readonly:!0});var d=new Pikaday(b)}return d},a.App.prototype.initDateControl=function(a,b){fieldElm=$("."+a),fieldElm.length&&fieldElm.each(function(a){var b=$(this).attr("id"),c=document.getElementById(b);$(c).attr({autocomplete:"off",readonly:!0}),new Pikaday({field:c,format:"DD/MM/YYYY",minDate:new Date})})},a.App.prototype.initSlickSlider=function(a){var b=$(a);slickInst=b.slick({dots:!1,infinite:!0,speed:600,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:1e3*app.getConfigItem("slideshow_speed"),fade:!0,cssEase:"linear",arrows:!0,prevArrow:'<span class="slider__nav slider__nav--prev"><i class="fa fa-angle-left"></i></span>',nextArrow:'<span class="slider__nav slider__nav--next"><i class="fa fa-angle-right"></i></span>',mobileFirst:!0,adaptiveHeight:!1})},a.App.prototype.initFlexslider=function(a,b){var c=$(a);if(c.length){var d={controlNav:!1,directionNav:!1,prevText:"",nextText:""};b=$.extend(!0,d,b),c.flexslider(b),$(".flexslider .prev").on("click",function(){return c.flexslider("prev"),!1}),$(".flexslider .next").on("click",function(){return c.flexslider("next"),!1})}},a.App.prototype.initSlickCarousel=function(a){var b=$(a);slickInst=b.slick({dots:!0,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:6e3,fade:!0,cssEase:"linear",arrows:!1,mobileFirst:!0,adaptiveHeight:!0})},a.App.prototype.initCarousel=function(a){var b=$(a);slickInst=b.slick({dots:!1,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:1,prevArrow:'<div class="gallery__carousel__prev"><i class="fa fa-angle-left"></i></div>',nextArrow:'<div class="gallery__carousel__next"><i class="fa fa-angle-right"></i></div>',mobileFirst:!0,adaptiveHeight:!1,responsive:[{breakpoint:340,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:590,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:991,settings:{slidesToShow:4,slidesToScroll:1}},{breakpoint:1200,settings:{slidesToShow:5,slidesToScroll:1}}]})},a.App.prototype.initPhotoswipe=function(a){var b=$(a);if(b.length){var c=app.getConfigItem("galleryImages"),d={index:0,shareEl:!1,preload:[1,2],history:!1,bgOpacity:.8};$.each(c,function(a,b){c[a].src=b.full_path}),b.on("click",function(a){a.preventDefault(),d.index=$(this).data("key"),new PhotoSwipe($(".pswp").get(0),PhotoSwipeUI_Default,c,d).init()})}},a.App.prototype.initShuffle=function(a){var b=$(a),c=this;b.length&&(b.shuffle({group:"all",itemSelector:"figure",speed:450}),$(".shuffle-trigger").on("click",function(a){a.preventDefault(),b.shuffle("shuffle",$(this).attr("data-group")),$(".shuffle-trigger").removeClass("active"),$(this).addClass("active")}),b.on("done.shuffle",function(){c.initPhotoswipeShuffle(a+" .img.ps-item")}))},a.App.prototype.initPhotoswipeShuffle=function(a){var b=$(a);if(b.length){var c=app.getConfigItem("templates").psGallery;0==$(".pswp").length&&$("body").append(c);var d={index:0,shareEl:!1,preload:[1,2],history:!1,bgOpacity:.8};b.on("click",function(b){b.preventDefault();var c=$(this),e=(c.data("gp"),$(a).siblings(".filtered")),f=c.data("fpath"),g=[];if(e.length&&e.each(function(a,b){var c=$(b),d=c.attr("data-fpath"),e=c.attr("title"),f=c.data("size").split("x");g.push({src:d,w:f[0],h:f[1],title:e})}),g.length){var h=$.map(g,function(a,b){return a.src});d.index=h.indexOf(f);new PhotoSwipe($(".pswp").get(0),PhotoSwipeUI_Default,g,d).init()}})}},a.App.prototype.initMap=function(){if($("#map-canvas").length){var a=app.getConfigItem("latitude"),b=app.getConfigItem("longitude"),c=app.getConfigItem("zoomLevel"),d=app.getConfigItem("address"),e=$.parseJSON(app.getConfigItem("mapStyles"));if(a&&b){var f,g=$(window).width(),h=!1,i="/themes/global/graphics/map-marker.png";g>992&&(h=!0);var j={zoom:parseInt(c),center:new google.maps.LatLng(a,b),scrollwheel:!1,zoomControl:!0,draggable:h,mapTypeId:google.maps.MapTypeId.ROAD,styles:e};console.log(j);var k=new google.maps.InfoWindow({content:d});f=new google.maps.Map(document.getElementById("map-canvas"),j),marker=new google.maps.Marker({position:new google.maps.LatLng(a,b),map:f,icon:i}),marker.addListener("click",function(){k.open(f,marker)})}}},a.App.prototype.getVar=function(a,b){if(b.hasOwnProperty(a))return b[a];for(var c in b)if(b[c].hasOwnProperty(a))return b[c][a];return!1},a.App.prototype.getConfigItem=function(a){return this.getVar(a,this.config)},a.App.prototype.toggleNav=function(a){var b=$(a);b.length&&b.on("click",function(a){a.preventDefault();var b=($(this),$("header nav"));b.length&&(b.slideToggle("slow"),$(".nav-toggle").toggleClass("active"),$("body").toggleClass("no-scroll"))})},a.App.prototype.toggleSubNav=function(a){var b=$(a);b.length&&b.on("click",function(a){a.preventDefault();var b=$(this),c=b.parents(".has-sub").find("ul");c.length&&(c.toggleClass("active"),b.toggleClass("active"))})},a.App.prototype.toggleAccomSubNav=function(a){var b=$(a);b.length&&b.on("click",function(a){a.preventDefault();var b=($(this),$("main nav"));b.length&&(b.toggle(),$(".sub-nav-toggle").toggleClass("active"),$(".nav-heading").toggleClass("hidden"))})},a.App.prototype.toggleNav=function(a){var b=$(a);b.length&&b.on("click",function(a){a.preventDefault();var b=($(this),$("header nav"));b.length&&(b.fadeToggle(400),$(".nav-toggle").toggleClass("active"),$("body").toggleClass("no-scroll"))})},a.App.prototype.matchElmHeight=function(a){var b="string"==typeof a?$(a):a;if(b){b.css("height","auto");var c=0;b.each(function(a,b){var d=$(b),e=d.height();e>c&&(c=e)}),b.css("height",c)}},a.App.prototype.initNewsletterSignup=function(a){var b=$(a);if(b.length){var c=b.find("#newsletter-submit");c.length&&c.on("click",function(a){a.preventDefault();var c=$.trim(b.find("#signup-email").val()),d="",e="msg--error",f=b.find(".msg");if(c){/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(c)?$.post(app.getConfigItem("serviceUrl"),"action=sign-up&email="+c,function(a){return a.msg&&f.removeAttr("class").addClass("msg "+a.type).html(a.msg),a.isValid&&setTimeout(function(){f.removeClass(a.type).html(""),b.find("#full-name").val(""),b.find("#signup-email").val("")},5e3),!1},"json"):d="Invalid email address provided."}else d="Your email address is required.";d&&f.removeAttr("class").addClass("msg "+e).html(d)})}}}(window);var app=new App;