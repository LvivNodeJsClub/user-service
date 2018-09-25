require('rootpath')();
const setting = require('app/setting');

const application = require('app/application');

application.listen(setting.PORT, () => {
    console.log(`Example app listening on port ${setting.PORT}!`);
});
