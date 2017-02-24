import { GenericStoreEnhancer, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { epic } from '../modules/root';
import { routerMiddleware } from 'react-router-redux';

/**
 * Create the store middleware for redux.
 * @return {GenericStoreEnhancer}
 */
export function getStoreMiddleware(history): GenericStoreEnhancer {
  let middlewares = [
    // Create middleware for redux-observables
    createEpicMiddleware(epic),
    // Router
    routerMiddleware(history)
  ];

  return applyMiddleware(...middlewares);
}
