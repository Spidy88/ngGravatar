var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");

var gravatarProvider = require('../../src/gravatarProvider');

chai.should();
chai.use(sinonChai);

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
            var mockHash = '88';
            var test;

            beforeEach(function() {
                global.md5 = sinon.stub().returns(mockHash);

                test = {
                    hash: '12345',
                    email: 'the.nick.ferraro@gmail.com',
                    size: 200
                };
            });

            it('should generate a minimal url', function() {
                var urlPattern = new RegExp('^//www.gravatar.com/avatar/' + test.hash + '$');
                var url;

                url = gravatarSvc.generateUrl({ hash: test.hash });

                url.should.match(urlPattern);
            });

            it('should generate a hash', function() {
                var urlPattern = new RegExp('^//www.gravatar.com/avatar/' + mockHash + '$');
                var url;

                url = gravatarSvc.generateUrl({ email: test.email });

                url.should.match(urlPattern);
                global.md5.should.have.been.calledOnce;
            });

            it('should prefer hash over email', function() {
                var urlPattern = new RegExp('^//www.gravatar.com/avatar/' + test.hash + '$');
                var url;

                url = gravatarSvc.generateUrl({
                    hash: test.hash,
                    email: test.email
                });

                url.should.match(urlPattern);
                global.md5.should.not.have.been.called;
            });

            xit('should support size', function() {
                url = gravatarSvc.generateUrl({
                    hash: test.hash,
                    size: test.size
                });

                //urlParams.should.have.property('s', test.size ).or.propert('size', test.size);
            });

            xit('should support a default image', function() {

            });

            xit('should support forcing default image', function() {

            });

            xit('should support rating filter', function() {

            });

            xit('should support multiple configurations', function() {

            });
        });
    });
});
