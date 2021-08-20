/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { Db } from 'mongodb';

declare global {
  var db: Db | undefined;
}
