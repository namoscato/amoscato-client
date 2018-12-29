declare var requirejs: any;

requirejs.config({
    baseUrl: 'js',
    paths: {
      jquery: '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min',
      moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.23.0/moment.min',
      onecolor: '//cdnjs.cloudflare.com/ajax/libs/onecolor/3.1.0/one-color',
    },
});

requirejs(['app']);
