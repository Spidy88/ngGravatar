var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");

var ngGravatar = require('../../src/ngGravatar');

chai.should();
chai.use(sinonChai);

describe('ngGravatar', function() {
    var gravatarDirective;

    beforeEach(function() {
        gravatarDirective = ngGravatar();
    });

    it('should return a directive definition object', function() {
        gravatarDirective.should.be.an('object');
    });
});
