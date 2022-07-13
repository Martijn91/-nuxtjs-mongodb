import { MongoClientOptions } from 'mongodb'

export type Username = string;
export type Password = string;
export type Host = string | Array<Host>;
export type Database = string;
export type Options = MongoClientOptions;

export interface ConnectionStringParams {
  username?: Username;
  password?: Password;
  host?: Host;
  database?: Database;
  options?: Options;
}
