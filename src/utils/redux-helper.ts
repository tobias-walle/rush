import { GenericStoreEnhancer, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { epic } from "../modules/root";

/**
 * Create the store middleware for redux.
 * @return {GenericStoreEnhancer}
 */
export function getStoreMiddleware(): GenericStoreEnhancer {
  let middlewares = [];

  // Create middleware for redux-observables
  middlewares.push(createEpicMiddleware(epic));

  return applyMiddleware(...middlewares);
}
