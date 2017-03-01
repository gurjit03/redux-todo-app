var redux = require('redux');

var defaultState = {
  searchText : '',
  showCompleted : false,
  todos : []
}

var reducer = (state = defaultState,action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText : action.name
      }
    default:
      return state
  }
}

var store = redux.createStore(reducer);

console.log('currentState',store.getState());
var actionToDispatch = {
  type : 'CHANGE_SEARCH_TEXT',
  name : 'hello'
}
store.dispatch(actionToDispatch);
console.log('------------------');
console.log('new updated state',store.getState());
