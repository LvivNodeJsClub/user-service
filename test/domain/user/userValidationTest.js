const sinon          = require('sinon');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const UserValidation = require('domain/user/userValidation');

describe('UserValidation', function() {

    let userValidation;

    before(function() {
        userValidation = new UserValidation();
    });

    describe('createValidator', function() {

        it('should throw error without body', async function() {
            const request  = {
                params: {
                    id: 1
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('Can not parse body.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without name', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {}
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User name is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error with short name', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name: 'Us'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User name 3 characters minimum.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without login', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name: 'User name'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User login is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error with short login', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'logi'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User login 5 characters minimum.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without email', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'userlogin'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User email is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without valid email', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'userlogin',
                    email: 'email'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User email is not valid email.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without password', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'user-login',
                    email: 'user@email.com'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User password is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without confirmPassword', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:     'User name',
                    login:    'user-login',
                    email:    'user@email.com',
                    password: 'password'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User confirmPassword is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error with mismatch password', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:            'User name',
                    login:           'user-login',
                    email:           'user@email.com',
                    password:        'password',
                    confirmPassword: 'confirmPassword'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User password and confirmPassword mismatch.');

            expect(next.calledOnce).equal(false);
        });

        it('should call next', function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:            'User name',
                    login:           'user-login',
                    email:           'user@email.com',
                    password:        'password',
                    confirmPassword: 'password'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            userValidation.createValidator(request, response, next)

            expect(next.calledOnce).equal(true);
            expect(next.calledWith()).equal(true);
        });
    });

    describe('updateValidator', function() {

        it('should throw error without body', async function() {
            const request  = {
                params: {
                    id: 1
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('Can not parse body.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without name', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {}
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User name is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error with short name', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name: 'Us'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User name 3 characters minimum.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without login', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name: 'User name'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User login is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error with short login', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'logi'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User login 5 characters minimum.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without email', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'userlogin'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User email is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without valid email', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'userlogin',
                    email: 'email'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User email is not valid email.');

            expect(next.calledOnce).equal(false);
        });

        it('should call next without password', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'user-login',
                    email: 'user@email.com'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            await userValidation.updateValidator(request, response, next);

            expect(next.calledOnce).equal(true);
            expect(next.calledWith()).equal(true);
        });

        it('should throw error without confirmPassword', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:     'User name',
                    login:    'user-login',
                    email:    'user@email.com',
                    password: 'password'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User confirmPassword is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error with mismatch password', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:            'User name',
                    login:           'user-login',
                    email:           'user@email.com',
                    password:        'password',
                    confirmPassword: 'confirmPassword'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('User password and confirmPassword mismatch.');

            expect(next.calledOnce).equal(false);
        });


        it('should call next', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name:  'User name',
                    login: 'login',
                    email: 'user@email.com'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            await userValidation.updateValidator(request, response, next)

            expect(next.calledOnce).equal(true);
            expect(next.calledWith()).equal(true);
        });
    });
});
