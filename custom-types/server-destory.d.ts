
declare module 'server-destroy' {
  import { Server } from 'http';
  declare function enableDestroy(server: Server): void;
  export = enableDestroy;
}