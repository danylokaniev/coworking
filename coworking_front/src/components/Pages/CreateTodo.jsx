import Input from '../inputs/Input'
import {useEffect, useState} from 'react'
import Select from './../inputs/Select'

const CreateTodo = () => {
    const [inputs, changeInputs] = useState({
        price: 0,
        description: '',
        metric: ''
    })
    const [response, setResponse] = useState('')
    const [filter, setFilter] = useState(true)
    const [initTodos, setInitTodos] = useState()

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
  

        fetch('http://localhost:9000/todos?' +  new URLSearchParams({
            ...inputs
        }), {
            method: 'POST',
        })
            .then(response => response.json())
            .then(json => {
                if(json.success) setResponse('Todo was created')
                else setResponse('Error') 

                setTimeout(() => setResponse(''), 5000)
            })


        changeInputs({
            price: 0,
            description: '',
            metric: ''
        })

     
    }

    useEffect(() => {
        fetch('http://localhost:9000/todos')
            .then(response => response.json())
            .then(json => setInitTodos(Object.values(json.response)))

    }, [filter])


    return (
        <>
            <div className="buttons">
                <button className={`btn ${filter === true ? 'btn-primary' : 'btn-secondary'}`}  onClick={() => setFilter(true)}> Створити </button>
                <button className={`btn ${filter === false ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(false)}> Послуги </button>
            </div>
            {
                filter 
                    ? <form autoComplete="off" onSubmit={onSubmit} className="main-block">
                        <div className="mainTitle">Создать услугу</div>
                        <Input 
                            placeholder={'Введите описание'} onChange={handleInputs} 
                            value={inputs.description} name={'description'}
                        />
                        <Input 
                            placeholder={'Введите цену'} onChange={handleInputs} type={'number'}
                            value={inputs.price} name={'price'}
                        />
                        <div className="create">
                            <div className="title">Выберите метрику:</div>
                            <Select onChange={handleInputs} value={inputs.metric} name={'metric'} 
                                opts={[{value: 'm2', text: 'm2'},{value: 'item', text: 'шт.'}]}
                            />
                        </div>
                        <button type="submit"  className="btn btn-primary"> Добавить услугу </button>
                        <div className={`response ${response ? ' ' : 'response-hidden'}`}>{response}</div>
                        
                    </form>
                    
                    :  <div className="main-block">
                        <div className="title">Список послуг:</div>
                        <table className="table table-hover todo-table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Услуга</th>
                                    <th scope="col">Цена за единицу</th>
                                    <th scope="col">Метрика</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    initTodos?.map((todo, ind) => (
                                        <tr key={ind}>
                                            <td>{todo.description}</td>
                                            <td>{todo.price}</td>
                                            <td>{todo.metric == 'm2' ? <span>м<sup>2</sup></span> : 'шт'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
            
        </>
    )
}

export default CreateTodo