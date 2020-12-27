import {useEffect, useState} from 'react'
import Select from './../inputs/Select'
import Input from '../inputs/Input'

const CreateOrder = (props) => {

    const [contact, setContact] = useState({})
    const [response, setResponse] = useState('')
    const [inputs, changeInputs] = useState({
        date: '',
        address: ''
    })
    const [todos, setTodos] = useState([])
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

    useEffect(() => {
        fetch('http://localhost:9000/todos')
            .then(response => response.json())
            .then(json => setInitTodos(Object.values(json.response)))


        let email = localStorage.getItem('email')
        let type = localStorage.getItem('type')
        let id = localStorage.getItem('id')

        setContact({
            email,
            type,
            id
        })
    }, [localStorage.getItem('email')])


    const setTodo = (event) => {

        const {name: index, value: id} = event.target

        const initTodo = initTodos.find(todo => todo.id === id)

        setTodos(todos.map((todo, ind)=> ind == index ? {
            price: initTodo.price, 
            description: initTodo.description, 
            amount: 1,
            finalPrice: initTodo.price, 
            todoId: initTodo.id,
            metric : initTodo.metric
        } : todo))
    }

    const addTodo = () => {
        
        const newTodos = [...todos]
        newTodos.push({
            description: '',
            price: 0,
            amount: 0,
            finalPrice: 0,
            todoId: ''
        })

        setTodos(newTodos)
    
    }

    
    const setPrice = (event) => {

        const {name: index, value } = event.target

        setTodos(todos.map((todo, ind)=> ind == index ? {
            ...todo,
            amount: value,
            finalPrice: value * todo.price
        } : todo))
    }

    const onSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let price = 0

        if(todos.length == 1){
            price = todos[0].finalPrice
        } else if( todos.length > 1) {
            price = todos.reduce((a,b) => a.finalPrice + b.finalPrice)
        }
        let orderId = ''

        fetch('http://localhost:9000/orders?' +  new URLSearchParams({
            clientId: contact.id,
            finishDateString: inputs.date,
            address: inputs.address,
            finalPrice: price,
        }), {
            method: 'POST',
        })
            .then(response => response.json())
            .then(json => {connectTodos(json.response.id); if(json.success) setResponse('Order was created'); setTimeout(() => setResponse(''), 5000)})


        changeInputs({
            date: '',
            address: ''
        })
        setTodos([])
       
    }

    const connectTodos = (orderId) => {
        todos.forEach( (todo) => {
            fetch('http://localhost:9000/orderTodo?' +  new URLSearchParams({
                orderId: orderId,
                todoId: todo.todoId,
                amount: todo.amount,
                price: todo.price,
            }), {
                method: 'POST',
            })
        })
    }


    return (
        <>
            <div className="mainTitle">Створити замовлення</div>
            <form autoComplete="off" onSubmit={onSubmit} className="main-block">
                <Input 
                    placeholder={'Введите адрес'} onChange={handleInputs} 
                    value={inputs.address} name={'address'}
                />
                <div className="create">
                    <div className="title">Выберите дату окончания ремонта:</div>
                    <Input 
                        placeholder={''} onChange={handleInputs} 
                        value={inputs.date} name={'date'} type="date"
                    />
                </div>
                <div className="title">Добавьте необходимые услуги:</div>
                
                {
                    todos.length !== 0 && 
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
                          todos.map((todo, ind) => (
                              <tr key={ind}>
                                  <th scope="row">
                                      <Select onChange={setTodo} value={todo.todoId} name={ind} 
                                          opts={initTodos.map( initTodo => ({
                                              value: initTodo.id,
                                              text:  initTodo.description
                                          }))}
                                      />
                                  </th>
                                  <td>
                                      <Input 
                                          placeholder={''} onChange={setPrice}
                                          value={todo.amount} name={ind}  type="number" 
                                      />
                                      
                                  </td>
                                  <td>{todo.metric == 'm2' ? <span>м<sup>2</sup></span> : 'шт'}</td>
                                  <td>{todo.price}</td>
                                  <td>{todo.finalPrice}</td>
                              </tr>
                          ))
                      }

                      {
                          todos.length !== 1 &&
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">{todos.reduce((a,b) => a.finalPrice + b.finalPrice) || '0'}</th>
                    </tr>
                      }
                  </tbody>

              </table>
              
                }
            
        
                <div className="todo-add">
                    <button type="button" className="btn btn-secondary" onClick={addTodo}>Добавить услугу </button>
                </div>
                <button type="submit"  className="btn btn-primary"> Создать заказ </button>

            </form>

            <div className={`response ${response ? ' ' : 'response-hidden'}`}>{response}</div>
        </>
    )
}

export default CreateOrder