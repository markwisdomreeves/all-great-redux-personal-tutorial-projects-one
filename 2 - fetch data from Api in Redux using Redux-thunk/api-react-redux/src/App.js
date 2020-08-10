import React, { Component } from 'react';
import "./App.css";
// importing connect from 'react-redux'
import { connect } from "react-redux";
import { fetchData } from "./actions/Asynchronous_action";


class App extends Component {


  componentDidMount() {
    this.props.onFetchData()
  }

  render() {
    return (
      <div className="app">
        <h1>Fetching the Data from the backend</h1>
        {
          this.props.error && <p>{this.props.error}</p>
        }

        {this.props.data && 
          <ul>
            <li>id: {this.props.data.id}</li>
            <li>title: {this.props.data.title}</li>
          </ul>
        }
      </div>
    );
  }
}

// inbuild mapStateToProps method
const mapStatetoProps = (state) => {
  return {
    num: state.num,
    data: state.data,
    error: state.error 
  }
}

// inbuild mapDispatchToProps method
const mapDispatchtoProps = (dispatch) => {
  return {
    onFetchData: () => dispatch(fetchData())
  }
}


// sharing or connecting our data to all the components in our app
export default connect(mapStatetoProps, mapDispatchtoProps)(App);
