import './styles.css'
import Input from '../inputs/Input'
import {useState} from 'react'
import Loader from '../loader/Loader'
import Select from './../inputs/Select'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Registration = (props) => {
    const [response, setResponse] = useState('')
    let history = useHistory()
    const [loader, startLoader] = useState(false)
    const [inputs, changeInputs] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        type: '',
        checkCode: ''
    }) 

    const loginUser = async (email, password, name, phone, type, checkCode) => {
        fetch('http://localhost:10000/users?' +  new URLSearchParams({
            email,
            password,
            name,
            phone,
            type,
            checkCode,
        }), {
            method: 'POST',
        })
            .then(response => response.json())
            .then(json => setTimeout(() => {console.log(json); handleResponse(json)}, 1000))
    }

    const handleResponse = ({response, success,sessionToken}) => {
        startLoader(false)
        if(success){
            console.log('+')
            localStorage.setItem('email', response.email)
            localStorage.setItem('type', response.type)
            localStorage.setItem('id', response.id)
            localStorage.setItem('sessionToken', sessionToken)
            history.push('/main')
            
            return 
        }
        setResponse(response)
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

        loginUser(inputs.email, inputs.password, inputs.name, inputs.phone, inputs.type, inputs.checkCode)

        changeInputs({
            email: '',
            password: '',
            name: '',
            phone: '',
            type: '',
            checkCode: ''
        })
    }

    return (
        <div className="registration-form">
            <form autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group">
                    <Input placeholder={'Введите email'} onChange={handleInputs} value={inputs.email} name={'email'}/>
                </div>
                <div className="form-group">
                    <Input placeholder={'Введите password'} onChange={handleInputs} value={inputs.password} name={'password'} type={'password'}/>
                </div>
                <div className="form-group">
                    <Input placeholder={'Введите name'} onChange={handleInputs} value={inputs.name} name={'name'}/>
                </div>
                <div className="form-group">
                    <Input placeholder={'Введите phone'} onChange={handleInputs} value={inputs.phone} name={'phone'}/>
                </div>
                <div className="form-group">
                    <Select onChange={handleInputs} value={inputs.type} name={'type'} opts={[{value: 'client', text: 'Клієнт'},{value: 'manager', text: 'Менеджер'},{value: 'guide', text: 'Екскурсовод'}]}/>
                </div>
                {
                    (inputs.type == 'repair' || inputs.type == 'manager') && 
                  <div className="form-group">
                      <Input placeholder={'Введите код подтверждения'} onChange={handleInputs} value={inputs.checkCode} name={'checkCode'} type={'password'}/>
                  </div>
                }
                <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Register</button>
                <div className="form-icon">
                    {
                        <div className={`response ${response ? ' ' : 'response-hidden'}`}>{response}</div> || (loader && <Loader /> )
                    }
                </div>
                <div className="log-register">
                    <Link to={'/'}>
                        <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Back to login</button>
                    </Link>
                </div>
            </form>
        </div>

    )
} 

export default Registration