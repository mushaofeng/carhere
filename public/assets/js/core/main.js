requirejs.config({
    baseUrl: '/assets/js',
    paths: {
        jquery: '/assets/libs/jquery/dist'
    },
    map: {
        '*': {
            'lib/jquery.validate': 'lib/localization/messages_zh'
        },
        'lib/localization/messages_zh': {
            'lib/jquery.validate': 'lib/jquery.validate'
        }
    }
});