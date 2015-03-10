var gravatarProvider = require('./gravatarProvider');
var ngGravatar = require('./ngGravatar');

module.exports = angular
    .module('ngGravatar', [])
    .provider('gravatar', gravatarProvider)
    .directive('ngGravatar', ngGravatar);