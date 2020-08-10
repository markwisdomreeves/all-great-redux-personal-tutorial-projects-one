import React, {useEffect} from 'react';
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


function App () {
  /* useSelector - is analogous to connect’s mapStateToProps. You pass it a function 
  that takes the Redux store state and returns the pieces of state you’re interested in */
  const content = useSelector(state => state);
  /* useDispatch - replaces connect’s mapDispatchToProps but is lighter weight. 
  All it does is return your store’s dispatch method so you can manually dispatch actions. */
  const dispatch = useDispatch();

  // we are making our asynchronous call or action here
  function getData() {
    return dispatch => {
      axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then(res => 
          dispatch({
            type: "FETCH_DATA",
            data: res.data
          })
        );
    };
  }

  // we are invoking or calling our action from within this function
  // function onFetchDataFromApi() {
    // invoking the action
  //   dispatch(getData());
  // }

  /* We can also dispatch actions whenever the component mounts by using useEffect hook. */
  useEffect(() => {
    dispatch(getData());
  }, []);

    return (
      <div className="app">
        {/* <button onClick={onFetchDataFromApi}>fetch data from Api</button> */}
        {content.data && (
          <ul>
            <li>{content.data.id}</li>
            <li>{content.data.title}</li>
          </ul>
        )}
      </div>
    );
}


export default App;
