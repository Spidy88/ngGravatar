var chai = require('chai');
var gravatarProvider = require('../../src/gravatarProvider');

chai.should();

describe('gravatarProvider', function() {
    var providerInstance;

    beforeEach(function() {
        providerInstance = new gravatarProvider();
    });

    describe('$get', function() {
        it('should exist', function() {
            providerInstance.should.respondTo('$get');
        });

        it('should return a gravatar service', function() {
            var gravatarSvc = providerInstance.$get();

            gravatarSvc.should.be.an('object');
            gravatarSvc.should.respondTo('shouldBindOnce');
            gravatarSvc.should.respondTo('generateUrl');
        });
    });

    describe('bindOnce', function() {
        it('should exist', function() {
            providerInstance.should.respondTo('bindOnce');
        });

        it('should default to binding once', function() {
            var gravatarSvc = providerInstance.$get();

            gravatarSvc.shouldBindOnce().should.be.true;
        });

        it('should be able to disable binding once', function() {
            var gravatarSvc;

            providerInstance.bindOnce(false);
            gravatarSvc = providerInstance.$get();

            gravatarSvc.shouldBindOnce().should.be.false;
        });
    });

    describe('configure', function() {
        it('should exist', function() {
            providerInstance.should.respondTo('configure');
        });
    });

    describe('gravatar', function() {
        var gravatarSvc;

        beforeEach(function() {
            gravatarSvc = providerInstance.$get();
        });

        describe('generateUrl', function() {
            it('should generate a minimal url', function() {
                var testHash = '01234';
                var urlPattern = new RegExp('^//www.gravatar.com/avatar/' + testHash + '$');
                var url;

                url = gravatarSvc.generateUrl({ hash: testHash });

                url.should.match(urlPattern);
            });

            xit('should support size', function() {

            });

            xit('should support a default image', function() {

            });

            xit('should support forcing default image', function() {

            });

            xit('should support rating filter', function() {

            });
        });
    });
});
