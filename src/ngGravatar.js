module.exports = ngGravatar;

ngGravatar.$inject = ['gravatar'];
function ngGravatar(gravatar) {
    return {
        scope: {},
        restrict: 'EA',
        link: link
    };

    function link(scope, element, attrs) {
        var isElement = /NG-GRAVATAR/i.test(element[0].nodeName);

        // If this is an element directive, insert an image element
        if( isElement ) {
            var imgElement = angular.element('<img />');
            element.append(imgElement);
            element = imgElement;
        }

        // If bindOnce is set and false, or the global default is not to bind once
        if( (scope.bindOnce !== undefined && !scope.bindOnce) || !gravatar.shouldBindOnce() ) {
            // Watch attributes for changes and triggers updateGravatar immediately
            scope.$watchCollection( currentAttrs, updateGravatar );
        }
        // Else use a one time binding and generate the url just this once
        else {
            updateGravatar();
        }

        // Get the current set of attributes (only those we care about)
        function currentAttrs() {
            return {
                email: attrs['ng-gravatar'] || attrs.email,
                hash: attrs.hash,
                size: attrs.size || attrs.s,
                defaultImage: attrs['default-image'] || attrs.d,
                forceDefault: attrs['force-default'] || attrs.f,
                rating: attrs.rating || attrs.r
            };
        }

        // Update the gravatar url
        function updateGravatar() {
            var gravatarOptions = currentAttrs();
            var gravatarUrl = gravatar.generateUrl(gravatarOptions);

            element.attr('src', gravatarUrl);
        }
    }
}