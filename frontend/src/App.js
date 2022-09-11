import './App.css';
import {BrowserRouter as Router,Routes,Route} from  'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'



function App() {
  return (

    <Router>
    
    <div className="App">
    <Header/>
    <div className="container container-fluid">
      <Routes>
      <Route path="/" element={<Home/>} exact />
      </Routes>
      </div>
    <Footer/>
    </div>
   
    </Router>
  
  );
}

export default App;
