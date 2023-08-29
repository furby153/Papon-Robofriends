import React from "react";
import { connect } from "react-redux";
import SearchBox from "../components/SearchBox";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
// import { robots } from "./robots";
import './App.css';

import { requestRobots, setSearchField } from "../actions";

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends React.Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render(){
        const { searchField ,onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter( inputRobot => {
            return (
                // filter by name
                inputRobot.name.toLowerCase().includes(searchField.toLowerCase()) 
                ||
                // filter by email
                inputRobot.email.toLowerCase().includes(searchField.toLowerCase())
            );
        })
        return isPending ?
        <h1 className='tc f1'>Loading</h1> :
        (
            <div className="tc">
            <h1 className="f1">Robofriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
            </Scroll>
            </div>  
        );
        } 
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);