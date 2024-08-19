/**
 * . Create a file - 'secrets-config.ts' in the src dir and add the credentials there (userName, password, databaseName).
 * . Then simply import and use those values here.
 * */
import * as SECRETS from '../secrets-config';

const userName = SECRETS.userName; //* Replace with your database userName
const password = SECRETS.password; //* Replace with your database passsword
const databaseName = SECRETS.databaseName; //* Replace with your database id/name

export const DatabaseConnectionString = `mongodb+srv://${userName}:${password}@${databaseName}.mongodb.net/`;
