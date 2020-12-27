import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import Main from './components/Pages/Main'
import CreateOrder from './components/Pages/CreateOrder'
import Contact from './components/Pages/Contact'
import { Link, BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import {useState, useEffect} from 'react'

function App() {
   
    return (
        <div className="App">
            <Router>      
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>        
                    <Route path="/register" exact>
                        <Registration />
                    </Route>  
                    <Main />
                </Switch>      
            </Router>    
            
        </div>
    )
}

export default App
