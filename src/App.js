// import './App.css';
import Parent from './components/Parent';
import Personal from './components/Personal';
import Photo from './components/Photo';
import Address from './components/Address';
import Details from './components/Details';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" Component={Parent}></Route>
          <Route path="/personalDetails" Component={Personal}></Route>
          <Route path="/addressDetails" Component={Address}></Route>
          <Route path="/takePhoto" Component={Photo}></Route>
          <Route path="/Details" Component={Details}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

