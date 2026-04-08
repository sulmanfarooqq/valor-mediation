const MongoStore = require('connect-mongo');
console.log('MongoStore type:', typeof MongoStore);
console.log('MongoStore properties:', Object.keys(MongoStore));
if (MongoStore.create) {
  console.log('MongoStore.create exists');
} else {
  console.log('MongoStore.create DOES NOT exist');
}
