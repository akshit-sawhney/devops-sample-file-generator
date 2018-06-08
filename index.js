let logger = require('./logger');
let _  = require('lodash');

let allAPIs = ['/api/billing','/api/competition', '/api/elastic','/api/files','/api/flashcards','/api/folders','/api/mentor','/api/notifications','/api/packages','/api/permissions','/api/questions','/api/schools','/api/tests','/api/translations','/api/tutoring','/api/users'];
let allStatusCodes = [401, 402, 403, 404, 502, 520];
let allDevices = ['android', 'web', 'iOS'];

function logGenerator() {
  let api = _.sample(allAPIs);
  let status = _.sample(allStatusCodes);
  let device = _.sample(allDevices);
  logger({'status_code': status, 'device': device}, 'Sample', api);
}

for(var i=0; i<100000; i++) {
    logGenerator();
}