var redux = require('redux');
var movieId = 1;

var defaultState = {
  searchText : '',
  showCompleted : false,
  todos : [],
  movies : []
}

// Action in all the reducers will be the same object
var searchTextReducer = (state='',action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
}

var moviesReducer = (state = [],action) => {
  console.log('state in movies reducer',state);
  switch(action.type) {
    case 'ADD_MOVIE' :
    return [
      ...state,
      {
        id : movieId++,
        title : action.title,
        genre : action.genre
      }
    ]
    case 'REMOVE_MOVIE' :
      return [state.filter(movie => movie.id !== action.id )]
    default:
      return state;
  }
}

var completeReducer = (state=defaultState.showCompleted , action) => {
  switch(action.type) {
    case 'TOGGLE_COMPLETED':
      return !state;
    default:
      return state;
  }
}

var reducer = redux.combineReducers({
  searchText : searchTextReducer,
  showCompleted : completeReducer,
  movies : moviesReducer
})
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

store.subscribe(() => {
  console.log('new state',store.getState());
})
var actionToDispatch = {
  type : 'CHANGE_SEARCH_TEXT',
  searchText : 'hello'
}
store.dispatch(actionToDispatch);

store.dispatch({
  type : 'ADD_MOVIE',
  title : 'dabang',
  genre : 'comedy-romance'
})

store.dispatch({
  type : 'ADD_MOVIE',
  title : 'After dawn',
  genre : 'horror'
})


// Removing the hobby by dispatching the Action
store.dispatch({
  type : 'REMOVE_MOVIE',
  id : 2
})
