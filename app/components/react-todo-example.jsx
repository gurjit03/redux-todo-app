var redux = require('redux');
var axios = require('axios');
var actions = require('../actions/index');
var store = require('../stores/configureStore').configure();

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
store.dispatch(actions.changeSearchText('hello'));

// Adding the movie by dispatching the action
store.dispatch(actions.addMovie("Dhoni: The untold story","biopic"))

store.dispatch(actions.addMovie("After Dawn","horror"))

// Removing the movie by dispatching the Action
store.dispatch(actions.removeMovie(2))

// Calling the fetch location to call the API asynchronously
store.dispatch(actions.fetchLocation());
