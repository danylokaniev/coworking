import {useEffect, useState} from 'react'
import Order from './Order'
import React from 'react'

const RepairOrders = (props) => {
    const [orders, setOrders] = useState([])
    const [orderId, setOrderId] = useState('')
    const [response, setResponse] = useState('')

    const [filter, setFilter] = useState(true)

    useEffect(() => {
        fetch('http://localhost:9000/orders/repairId?' +   new URLSearchParams({
            repairId: localStorage.getItem('id'),
        }))
            .then(response => response.json())
            .then(json => {
                let orders = []
                if(json.success)
                    orders =  Object.values(json?.response).map(order => {
                        return ({...order,
                            todos: Object.values(order.todos) ,
                            openTodos: false
                        })} 
                    )
                setOrders(orders)
            }
            )
    }, [orderId])
    console.log(orders)

    const finishOrder = (id) => {
        let finish = confirm('Ви впевнені, що хочете закінчити замовлення?')

        if(finish)        
            fetch(`http://localhost:9000/orders/finish/${id}?`, {
                method: 'PUT',
            })
                .then(response => response.json())
                .then(json => {
                    setOrderId(json.response)
                    if(json.success) setResponse('order was updated')
                    else setResponse('error')

                    setTimeout(() => setResponse(''), 5000)
                })
    }

    const toggleTodos = (id) => {
        setOrders(orders.map((order) => (order.id === id && order.todos.length !== 0) ? {...order, openTodos: !order.openTodos} : order))
    }



    return ( 
        <div style={{margin: '0 100px'}} className="main-block">
            <div className="buttons">
                <button className={`btn ${filter ? 'btn-primary' : 'btn-secondary'}`}  onClick={() => setFilter(true)}> Незавершенні </button>
                <button className={`btn ${!filter ? 'btn-primary' : 'btn-secondary'}`}  onClick={() => setFilter(false)}> Завершенні </button>
            </div>
            <table className="table table-hover todo-table repair-table">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Номер</th>
                        <th scope="col">Адреса</th>
                        <th scope="col">Вартість</th>
                        <th scope="col">Кінцева дата</th>
                        <th scope="col">Завершений</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.filter(order => order.isFinished !== filter).map((order, ind) => {
                            return (
                                <React.Fragment key={ind}>
                                    <tr key={ind} 
                                        className={order.openTodos ? 'table-warning' : ''}
                                        onClick={() => toggleTodos(order.id)}>
                                        <td>{ind + 1}</td>
                                        <td>{order.address}</td>
                                        <td>{order.finalPrice}</td>
                                        <td>{order.finishTime && order.finishTime.split(' ')[0]}</td>
                                        <td>{order.isFinished ? 'Так' : 'Ні'}</td>
                                        <td> {!order.isFinished && <button className='btn btn-secondary' onClick={() => finishOrder(order.id)}> Завершити </button>}</td>

                                    </tr>
                                    {
                                        (order.openTodos && !!order.todos.length) && 
                                        <>
                                            <tr className="table-info openTodo" key={ind}>
                                                <th scope="col">Номер</th>
                                                <th scope="col">Опис</th>
                                                <th scope="col">Кількість</th>
                                                <th scope="col">Вартість</th>
                                                <th scope="col">Загально</th>
                                                <th scope="col"></th>
                                            </tr>
                                            {order.todos.map((todo, ind) => (
                                                <tr key={ind} className="table-info" >
                                                    <td>{ind + 1}</td>
                                                    <td>{todo.description}</td>
                                                    <td>{todo.amount}</td>
                                                    <td>{todo.price}</td>
                                                    <td>{todo.finalPrice}</td>
                                                    <td scope="col"></td>
                                                </tr>
                                            )) }
                                        </>
                                    }
                                </React.Fragment >
                            )
                        })
                    }
                </tbody>
            </table>
            <div className={`response ${response ? ' ' : 'response-hidden'}`}>{response}</div>
        </div>
    )
}

export default RepairOrders