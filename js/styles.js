function css( src ) {


    return new Promise( function( resolve, reject ) {

        var link = document.createElement( 'link' );

        link.rel  = 'stylesheet';

        link.media = "print"
        link.href = src;

        document.head.appendChild( link );

        link.onload = function() { 
            this.media = "all"
            resolve(); 
        };
    });


}
    

css('css/animate.css');
css('css/bootstrap.min.css');
css('css/et-line-icons.css');
css('css/font-awesome.min.css');
css('css/themify-icons.css');
css('css/swiper.min.css');
css('css/justified-gallery.min.css');
css('css/magnific-popup.css');
css('revolution/css/layers.css');
css('revolution/css/navigation.css');
// css('css/responsive.css');

