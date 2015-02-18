var md5 = require('blueimp-md5').md5;

module.exports = gravatarProvider;

gravatarProvider.$inject = [];
function gravatarProvider() {
    var baseUrl = '//www.gravatar.com/avatar/';
    var shouldEnforceExtension = false;
    var fileExtension = '.jpg';
    var defaultSize;
    var defaultImage;
    var defaultRating;

    this.$get = $get;
    this.setBaseUrl = setBaseUrl;
    this.enforceExtension = enforceExtension;
    this.setDefaultImage = setDefaultImage;
    this.setDefaultSize = setDefaultSize;
    this.setDefaultRating = setDefaultRating;

    function $get() {
        var service = {
            generateUrl: generateUrl
        };

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
                params.push('r=' + r);
            }

            if( params.length ) {
                url += ('?' + params.join('&'));
            }

            console.log('Params: ', params);
            console.log('Options: ', opts);

            return url;
        }

        return service;
    }

    function setBaseUrl(url) {
        // Verify url is defined and a string
        if( angular.isUndefined(url) || (url !== 'string') ) {
            return console.error('Gravatar#setBaseUrl requires a string base url parameter');
        }

        // Make sure the url ends with a slash
        if( url[url.length - 1] !== '/' ) {
            url += '/';
        }

        baseUrl = url;
    }

    function enforceExtension(shouldEnforce) {
        shouldEnforceExtension = !!shouldEnforce;
    }

    function setDefaultImage(url) {
        defaultImage = url;
    }

    function setDefaultSize(size) {
        defaultSize = size;
    }

    function setDefaultRating(rating) {
        defaultRating = rating;
    }
}