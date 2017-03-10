import { ConnectionData } from './connection-data';

export class DashboardConnection {
  data: {[key: string]: ConnectionData} = {};
  online?: boolean;
}