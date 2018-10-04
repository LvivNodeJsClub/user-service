require('rootpath')();
const newman = require('newman');

newman.run({
    collection:  require('e2e-test/user-service.postman_collection.json'),
    environment: require('e2e-test/user-service.postman_environment.json'),
    reporters:   ['cli', 'html'],
    reporter:    {
        html: {
            export: 'output/e2e/index.html'
        }
    }
}, function(error) {
    if (error) {
        throw error;
    }
    console.log('Collection run complete!');
});
