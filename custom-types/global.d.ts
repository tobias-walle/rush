import { GlobalState } from '@src/app/modules/root';

declare global {
  interface NodeModule {
    hot: any;
  }
  interface Window {
    __data: GlobalState;
  }
}
