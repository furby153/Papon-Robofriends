import React , { useState , useEffect }from "react";
import SearchBox from "../components/SearchBox";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';

function App() {

    const [ robots, setRobots ] = useState([]);
    const [ searchfield, setSearchfield ] = useState('');
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            setRobots(users);
            console.log(count);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [count]); // only run if count changes.

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

    const filteredRobots = robots.filter( inputRobot => {
        return (
            // filter by name
            inputRobot.name.toLowerCase().includes(searchfield.toLowerCase()) 
            ||
            // filter by email
            inputRobot.email.toLowerCase().includes(searchfield.toLowerCase())
        );
    })
    return !robots.length ?
    <h1 className='tc f1'>Loading</h1> :
    (
        <div className="tc">
        <h1 className="f1">Robofriends</h1>
        <button onClick={()=>setCount(count+1)}>Click Me! {count===0 ? '':count}</button>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
            <ErrorBoundary>
                <CardList robots={filteredRobots}/>
            </ErrorBoundary>
        </Scroll>
        </div>  
    );    
}

export default App;