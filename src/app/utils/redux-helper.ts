import { GenericStoreEnhancer, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { epic } from '../modules/root';

/**
 * Create the store middleware for redux.
 * @return {GenericStoreEnhancer}
 */
export function getStoreMiddleware(): GenericStoreEnhancer {
  const middlewares = [
    // Create middleware for redux-observables
    createEpicMiddleware(epic),
  ];

  return applyMiddleware(...middlewares);
}
