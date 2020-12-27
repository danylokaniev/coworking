import './styles.css'
import Input from '../inputs/Input'
import {useState, useEffect } from 'react'
import Loader from '../loader/Loader'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [response, setResponse] = useState('')
    const [loader, startLoader] = useState(false)
    let history = useHistory()
    const [inputs, changeInputs] = useState({
        email: '',
        id: '',
        password: '',
        rememberMe: false,
    }) 


    const loginUser = async (email, password) => {
        fetch('http://localhost:9000/users?' +  new URLSearchParams({
            email,
            password,
        }))
            .then(response => response.json())
            .then(json => setTimeout(() => {handleResponse(json)}, 1000))
    }


    useEffect(() => {
        localStorage.clear()
    }, [])

    const handleResponse = ({response, success}) => {

        startLoader(false)
        if(success){

            localStorage.setItem('email', response.email)
            localStorage.setItem('type', response.type)
            localStorage.setItem('id', response.id)

            changeInputs({
                email: '',
                password: '',
                rememberMe: false,
            })

            history.push('/main')
            return 
        }

        
        setResponse('Email or Password is incorrect')
        setTimeout(() => setResponse(''), 5000)
    }

    const handleInputs = (event) => {
        const {name, value, type} = event.target


        if(type === 'checkbox'){
            changeInputs(state => ({
                ...inputs,
                rememberMe: !state.rememberMe,
            }))
        } else {
            changeInputs({
                ...inputs,
                [name]: value,
            })
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setResponse('')
        setTimeout(() => setResponse(''), 5000)
        startLoader(true)

        loginUser(inputs.email, inputs.password)
    }

    


    return (
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex bg-image-reg"></div>
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4">Split page!</h3>
                                    <p className="text-muted mb-4">Create a login split page using Bootstrap 4.</p>
                                    <form onSubmit={onSubmit} autoComplete="off">
                                        <div className="form-group mb-3">
                                            <Input placeholder={'Введите email'} onChange={handleInputs} value={inputs.email} name={'email'}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <Input placeholder={'Введите пароль'} onChange={handleInputs} value={inputs.password} name={'password'} type={'password'}/>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input id="customCheck1" type="checkbox" className="custom-control-input" onChange={handleInputs} checked={inputs.rememberMe}/>
                                            <label htmlFor="customCheck1" className="custom-control-label">Remember me</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                    </form>

                                    <div className="log-response">
                                        {
                                            <div className={`response ${response ? ' ' : 'response-hidden'}`}>{response}</div> || (loader && <Loader /> )
                                        }
                                    </div>

                                    <div className="log-register">
                                        <Link to={'/register'}>
                                            <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Register now</button>
                                        </Link>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
} 

export default Login