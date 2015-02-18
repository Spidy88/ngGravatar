
module.exports = ngGravatar;

ngGravatar.$inject = ['gravatar'];
function ngGravatar(gravatar) {
    var ddo = {
        scope: {
            email: '=?',
            hash: '=?',
            size: '=?',
            defaultImage: '=?',
            forceDefault: '=?',
            rating: '=?'
        },
        restrict: 'E',
        replace: true,
        link: link,
        template: '<img >'
    };

    function link(scope, element, attrs) {
        scope.$watchCollection(function() {
            return scope;
        }, updateGravatar);

        function updateGravatar() {
            var gravatarOptions = {
                email: scope.email,
                hash: scope.hash,
                size: scope.size,
                defaultImage: scope.defaultImage,
                forceDefault: scope.forceDefault,
                rating: scope.rating
            };

            var gravatarUrl = gravatar.generateUrl(gravatarOptions);

            element.attr('src', gravatarUrl);
        }
    }

    return ddo;
}