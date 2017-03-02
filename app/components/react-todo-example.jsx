var redux = require('redux');
var axios = require('axios');
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
// Map reducer and action generator
// --------------------

var mapReducer = (state ={isFetching:false,url:undefined},action) => {
  switch(action.type) {
    case 'START_LOCATION_FETCH' :
    return {
      isFetching : true,
      url : undefined
    }
    case 'COMPLETE_LOCATION_FETCH':
    return {
      isFetching : false,
      url : action.url
    }
    default:
    return state;
  }
}

var startLocationFetch = () => {
  return {
    type : 'START_LOCATION_FETCH',
  }
}

var completeLocationFetch = (url) => {
  return {
    type : 'COMPLETE_LOCATION_FETCH',
    url
  }
}

// It will fetch the location
// we let the application knows that fetching is started
var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then( (res) => {
    var loc = res.data.loc;

    var baseUrl = 'http://maps.google.com?q='

    store.dispatch(completeLocationFetch(baseUrl + loc));
  })
}

var reducer = redux.combineReducers({
  searchText : searchTextReducer,
  showCompleted : completeReducer,
  movies : moviesReducer,
  map : mapReducer
})

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

store.subscribe(() => {
  var state = store.getState();
  console.log('new state',store.getState());
  if(state.map.isFetching) {
    document.getElementById('app').innerHTML = "loading.............";
  }else if(state.map.url) {
    document.getElementById('app').innerHTML = "<a href="+state.map.url+" target='_blank'>Go to the following site.</a>"
  }
})

// Changing the text
store.dispatch(changeSearchText('hello'));

// Adding the movie by dispatching the action
store.dispatch(addMovie("Dhoni: The untold story","biopic"))

store.dispatch(addMovie("After Dawn","horror"))

// Removing the movie by dispatching the Action
store.dispatch(removeMovie(2))

// Calling the fetch location to call the API asynchronously
fetchLocation();
