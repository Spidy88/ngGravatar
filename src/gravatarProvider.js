module.exports = gravatarProvider;

gravatarProvider.$inject = [];
function gravatarProvider() {
    var oneTimeBind = true;
    var baseUrl = '//www.gravatar.com/avatar/';
    var shouldEnforceExtension = false;
    var fileExtension = '.jpg';
    var defaultSize;
    var defaultImage;
    var defaultRating;

    this.$get = $get;
    this.configure = configure;
    this.bindOnce = bindOnce;

    function $get() {
        var service = {
            shouldBindOnce: shouldBindOnce,
            generateUrl: generateUrl
        };

        function shouldBindOnce() {
            return oneTimeBind;
        }

        function generateUrl(opts) {
            var hash = opts.hash || md5(opts.email);
            var url = baseUrl + hash;
            var params = [];

            var s, d, f, r;

            if( shouldEnforceExtension ) {
                url += fileExtension;
            }

            if( s = opts.size || defaultSize ) {
                params.push('s=' + s);
            }

            if( d = opts.defaultImage || defaultImage ) {
                params.push('d=' + d);
            }

            if( f = opts.forceDefault ) {
                params.push('f=' + f);
            }

            if( r = opts.rating || defaultRating ) {
                params.push('r=' + encodeURIComponent(r));
            }

            if( params.length ) {
                url += ('?' + params.join('&'));
            }

            return url;
        }

        return service;
    }

    function configure(options) {
        if( options.hasOwnProperty('baseUrl') ) {
            setBaseUrl(options.baseUrl);
        }

        if( options.hasOwnProperty('enforceExtension') ) {
            shouldEnforceExtension = !!options.enforceExtension;
        }

        if( options.hasOwnProperty('defaultImage') ) {
            defaultImage = options.defaultImage;
        }

        if( options.hasOwnProperty('defaultSize') ) {
            defaultSize = options.defaultSize;
        }

        if( options.hasOwnProperty('defaultRating') ) {
            defaultRating = options.defaultRating;
        }
    }

    function bindOnce(enabled) {
        oneTimeBind = !!enabled;
    }

    function setBaseUrl(url) {
        // Make sure the url ends with a slash
        if( url[url.length - 1] !== '/' ) {
            url += '/';
        }

        baseUrl = url;
    }
}