import Input from '../inputs/Input'
import {useEffect, useState} from 'react'
import Select from './../inputs/Select'

const Order = (props) => {

    const [inputs, changeInputs] = useState({
        address: '',
        clientEmail: '',
        repairEmail: '',
        finishTime: '',
        repairId: ''

    })

    const [repairs, setRepairs] = useState([])
    const [todos, setTodos] = useState([])

    const [response, setResponse] = useState('')

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

        fetch(`http://localhost:9000/orders/${inputs.id}?` +  new URLSearchParams({
            repairId: inputs.repairId,
            clientId: inputs.clientId,
            isFinished: inputs.isFinished,
            address: inputs.address,
            finishTime: inputs.finishTime
        }), {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if(json.success) setResponse('Order was Updated')
                else setResponse('Error') 

                setTimeout(() => setResponse(''), 5000)
            })
    }

    const back = () => {
        changeInputs({
            address: '',
            clientEmail: '',
            repairEmail: '',
            finishTime: '',
            isFinished: false
        })

        props.goBack()
    }

    useEffect(() => {
        changeInputs({...props.order})
        fetch('http://localhost:9000/users/type?' +  new URLSearchParams({
            type: 'repair'
        }), {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                const repairs = []
                Object.keys(json.response).map(repair => repairs.push({text: repair, value: json.response[repair].id}))
                repairs.unshift({text: 'Не визначено', value: '00000000-0000-0000-0000-000000000000'})
                if(json.success) setRepairs(repairs)
                else setResponse('Error') 
                setTimeout(() => setResponse(''), 5000)
            })

        inputs.id && 
        fetch(`http://localhost:9000/orderTodo/${inputs.id}?`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                const todos = Object.keys(json.response).map(num => json.response[num])
                if(json.success) setTodos(todos)
            })

    }, [props])


    console.log(inputs)

    return (
        <>
            <form autoComplete="off" onSubmit={onSubmit} className="main-block">
                <div className="form-group">
                    <Input placeholder={'Email клієнта'} onChange={handleInputs} value={inputs.clientEmail} name={'clientEmail'} disabled/>
                </div>
                <div className="form-group">
                    <Input placeholder={'Адреса замовлення'} onChange={handleInputs} value={inputs.address} name={'address'}/>
                </div>
                <div className="form-group">
                    <div className="title">Виконувач:</div>
                    <Select onChange={handleInputs} value={inputs.repairId} name={'repairId'} opts={repairs}/>
                </div>
                <div className="title">Кінцева дата виконання:</div>
                <Input 
                    placeholder={''} onChange={handleInputs} 
                    value={inputs.finishTime && inputs.finishTime.split(' ')[0]} name={'finishTime'} type="date"
                />
                <div className="title">Замовлення завершене:</div>
                <div className="radio">
                    <input type="radio" value={'true'} name="isFinished" onChange={handleInputs} checked={inputs?.isFinished?.toString() == 'true'}/> Так
                    <input type="radio" value={'false'} name="isFinished" onChange={handleInputs} checked={inputs?.isFinished?.toString() == 'false'}/> Ні
                </div>
                { todos.length !== 0 
                    ?   
                    <><div className="title">Список послуг:</div>
                        <table className="table table-hover todo-table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Услуга</th>
                                    <th scope="col">Количество</th>
                                    <th scope="col">Метрика</th>
                                    <th scope="col">Цена за единицу</th>
                                    <th scope="col">Итоговая цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todos?.map((todo, ind) => (
                                        <tr key={ind}>
                                            <td>{todo.description}</td>
                                            <td>{todo.amount}</td>
                                            <td>{todo.metric == 'm2' ? <span>м<sup>2</sup></span> : 'шт'}</td>
                                            <td>{todo.price}</td>
                                            <td>{todo.finalPrice}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                    : <div className="title">Послуги відсутні</div>
              
              
                }
                <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Оновити</button>
                <div className="form-icon">
                    <div className={`response ${response ? ' ' : 'response-hidden'}`}>{response}</div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={() => back()} style={{width: '100px'}}>Назад</button>
                </div>
            </form>
        </>
    )
}

export default Order