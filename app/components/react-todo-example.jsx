var redux = require('redux');
var movieId = 1;

var defaultState = {
  searchText : '',
  showCompleted : false,
  todos : [],
  movies : []
}
// SearchText Reducer and action generator........
// -----------------------------------------------
var searchTextReducer = (state='',action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
}

var changeSearchText = (searchText) => {
  return {
    type : 'CHANGE_SEARCH_TEXT',
    searchText
  }
}
//moviesReducer and action generator..........
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
      return state.filter(movie => movie.id !== action.id )
    default:
      return state;
  }
}
var addMovie = (title,genre) => {
  return {
    type : 'ADD_MOVIE',
    title,
    genre
  }
}

var removeMovie = (id) => {
  return {
    type : 'REMOVE_MOVIE',
    id
  }
}
// Complete Reducer and action generator .
// -----------------------
var completeReducer = (state=defaultState.showCompleted , action) => {
  switch(action.type) {
    case 'TOGGLE_COMPLETED':
      return !state;
    default:
      return state;
  }
}

var toggleShowCompleted = (showCompleted) => {
  return {
    type : 'TOGGLE_SHOW_COMPLETED',
    showCompleted : !showCompleted
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

// Changing the text
store.dispatch(changeSearchText('hello'));

// Adding the movie by dispatching the action
store.dispatch(addMovie("Dhoni: The untold story","biopic"))

store.dispatch(addMovie("After Dawn","horror"))

// Removing the movie by dispatching the Action
store.dispatch(removeMovie(2))
