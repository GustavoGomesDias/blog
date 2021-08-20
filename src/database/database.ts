/* eslint-disable no-unused-vars */
import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost';

// eslint-disable-next-line consistent-return
MongoClient.connect(uri, (err, connection) => {
  if (err) return console.log(err);

  global.db = connection?.db('blog');
});
