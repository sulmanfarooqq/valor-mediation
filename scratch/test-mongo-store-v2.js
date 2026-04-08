const MongoStore = require('connect-mongo');
console.log('MongoStore.default type:', typeof MongoStore.default);
if (MongoStore.default && MongoStore.default.create) {
  console.log('MongoStore.default.create exists');
} else {
  console.log('MongoStore.default.create DOES NOT exist');
}
