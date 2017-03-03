var axios = require('axios');
export var changeSearchText = (searchText) => {
  return {
    type : 'CHANGE_SEARCH_TEXT',
    searchText
  }
}
export var addMovie = (title,genre) => {
  return {
    type : 'ADD_MOVIE',
    title,
    genre
  }
}

export var removeMovie = (id) => {
  return {
    type : 'REMOVE_MOVIE',
    id
  }
}

export var toggleShowCompleted = (showCompleted) => {
  return {
    type : 'TOGGLE_SHOW_COMPLETED',
    showCompleted : !showCompleted
  }
}

export var startLocationFetch = () => {
  return {
    type : 'START_LOCATION_FETCH',
  }
}

export var completeLocationFetch = (url) => {
  return {
    type : 'COMPLETE_LOCATION_FETCH',
    url
  }
}

// It will fetch the location
// we let the application knows that fetching is started
export var fetchLocation = () => {
  return (dispatch) => {
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then( (res) => {
      var loc = res.data.loc;

      var baseUrl = 'http://maps.google.com?q='

      dispatch(completeLocationFetch(baseUrl + loc));
    })
  }
}
