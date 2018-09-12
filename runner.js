require('rootpath')();
const setting = require('setting');

const application = require('application');

application.listen(setting.PORT, () => {
    console.log(`Example app listening on port ${setting.PORT}!`);
});
