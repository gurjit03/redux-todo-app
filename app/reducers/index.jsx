var movieId = 1;

// SearchText Reducer and action generator........
// -----------------------------------------------
export var searchTextReducer = (state='',action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
}


//moviesReducer and action generator..........
export var moviesReducer = (state = [],action) => {
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

// Complete Reducer and action generator .
// -----------------------
export var completeReducer = (state=false , action) => {
  switch(action.type) {
    case 'TOGGLE_COMPLETED':
      return !state;
    default:
      return state;
  }
}

// Map reducer and action generator
// --------------------

export var mapReducer = (state ={isFetching:false,url:undefined},action) => {
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
