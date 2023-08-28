import React , { useState , useEffect }from "react";
import SearchBox from "../components/SearchBox";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';

function App() {
// Class App extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         searchfield: '',
    //     }
    // }
// When use Hooks instead of Class, Set state by doing as below:
    const [ robots, setRobots ] = useState([]);
    const [ searchfield, setSearchfield ] = useState('');
    // const [ ชื่อstate, functionที่จะเปลี่ยนstate ] = useState(initialState);

    // componentDidMount = async () => {
    //     const response = await fetch('https://jsonplaceholder.typicode.com/users');
    //     const users = await response.json();
    //     this.setState({ robots: users });
    // }
// Change componentDidMount to useEffect because we doesn't use Class anymore.
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            setRobots(users);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount
    

    

    const onSearchChange = (event) => {
        // this.setState({ searchfield: event.target.value }) 
        // ไม่ได้ใช้ Class แล้ว ไม่มีการใช้ this.setState 
        // และไม่ต้องทำแบบนี้ { ชื่อState: state ที่จะตั้ง } แล้ว
        // โดยใช้ function ที่จะเปลี่ยน state แบบนี้แทน
        // functionที่จะเปลี่ยนstate(ค่าที่จะให้เปลี่ยน);
        setSearchfield(event.target.value);
    }

    // const { robots, searchfield } = this.state;
    // พอไม่ได้ใช้ Class แล้ว ไม่มี render แล้ว ก็ไม่ต้องเรียก this.state แล้ว
    // สามารถลบทิ้งได้

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