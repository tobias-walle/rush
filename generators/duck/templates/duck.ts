export const <%= actionCreator %> = createDuck(
  '<%= action %>',
  (
    state: <%= stateClass %>,
    payload: {}
  ) => {
    return {
      ...state,
    };
  }
);
