import './styles.css'
import {useEffect, useState, useCallback} from 'react'
import { useHistory, Link} from 'react-router-dom'
import CreateTodo from './CreateTodo'
import CreateOrder from './CreateOrder'
import Orders from './Orders'
import Contact from './Contact'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RepairOrders from './RepairOrders'
import ClientPlaces from './ClientPlaces'
import Coworking from './Coworking'

const Main = (props) => {
    let history = useHistory()
    const [contact, setContact] = useState({})
    
    const getContact = () => {
        let email = localStorage.getItem('email')
        let type = localStorage.getItem('type')
        let id = localStorage.getItem('id')

        setContact({
            email,
            type,
            id
        })
    }

    useEffect(() => {
        getContact()
    }, [localStorage.getItem('email')])


    return (
        <>
            {
                contact.type === 'client' && 
                    <>
                        <header id="header">
                            <nav className="links" style={{'--items': 4}}>
                                <a onClick={() => history.push('/main')} href="">Головна</a>
                                <a onClick={() => history.push('/places')} href="">Коворкінг</a>
                                <a onClick={() => history.push('/create')} href="">Створити замовлення</a>
                                <a onClick={() => history.push('/contact')} href="">Контакти</a>
                                <span className="line"></span>
                            </nav>
                        </header>
                        <Route path="/main" exact>
                            <div>Головна</div>
                        </Route>   
                        <Route path="/places" exact>
                            <ClientPlaces />
                        </Route>         
                        <Route path="/contact" exact>
                            <Contact />
                        </Route>     
                        <Route path="/create" exact>
                            <CreateOrder />
                        </Route> 
                    </>  
            }

            {
                contact.type === 'manager' && 
                    <>
                        <header id="header">
                            <nav className="links" style={{'--items': 4}}>
                                <a onClick={() => history.push('/main')} href="">Головна</a>
                                <a onClick={() => history.push('/coworking')} href="">Коворкінг</a>
                                <a onClick={() => history.push('/todo')} href="">Екскурсії</a>
                                <a onClick={() => history.push('/contact')} href="">Контакти</a>
                                <span className="line"></span>
                            </nav>
                        </header>
                        <Route path="/main" exact>
                            <div>Головна</div>
                        </Route>       
                        <Route path="/coworking" exact>
                            <Coworking />
                        </Route>     
                        <Route path="/todo" exact>
                            <CreateTodo />
                        </Route> 
                        <Route path="/contact" exact>
                            <Contact />
                        </Route>  
                    </>  
            }

            {
                contact.type === 'repair' && 
                    <>
                        <header id="header">
                            <nav className="links" style={{'--items': 3}}>
                                <a onClick={() => history.push('/main')} href="">Головна</a>
                                <a onClick={() => history.push('/orders')} href="">Замовлення</a>
                                <a onClick={() => history.push('/contact')} href="">Контакти</a>
                                <span className="line"></span>
                            </nav>
                        </header>
                        <Route path="/main" exact>
                            <div>Головна</div>
                        </Route>      
                        <Route path="/orders" exact>
                            <RepairOrders />
                        </Route>   
                        <Route path="/contact" exact>
                            <Contact />
                        </Route>  
                           
                    </>  
            }


                
        </>
    )
}

export default Main