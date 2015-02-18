
var gravatarProvider = require('./gravatarProvider');
var ngGravatar = require('./ngGravatar');

angular.module('ngGravatar', [])
    .provider('gravatar', gravatarProvider)
    .directive('ngGravatar', ngGravatar);