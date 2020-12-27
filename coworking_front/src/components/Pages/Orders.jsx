import {useEffect, useState} from 'react'
import Order from './Order'

const Orders = (props) => {
    const [orders, setOrders] = useState([])
    const [visibleOrders, changeVisibleOrders] = useState([])
    const [orderId, setOrderId] = useState('')

    const [filter, setFilter] = useState('')

    useEffect(() => {
        fetch('http://localhost:9000/orders')
            .then(response => response.json())
            .then(json => {
                const orders = []
                if(json.success)
                    Object.keys(json.response).map(number => orders.push(json.response[number]))
                setOrders(orders)
                changeVisibleOrders(orders.sort((a,b) => a.finalPrice - b.finalPrice))
                setFilter('all')
            }
            )


    }, [orderId])

    const setVisibleOrders = (state) => {
        setFilter(state)
        switch(state) {
        case 'completed':
            changeVisibleOrders(orders.filter(order => order.isFinished).sort((a,b) => a.finalPrice - b.finalPrice))
            break
        case 'NotCompleted':
            changeVisibleOrders(orders.filter(order => !order.isFinished).sort((a,b) => a.finalPrice - b.finalPrice))
            break
        case 'withoutRepair':
            changeVisibleOrders(orders.filter(order => !order.repairEmail).sort((a,b) => a.finalPrice - b.finalPrice))
            break
        default:
            changeVisibleOrders(orders.sort((a,b) => a.finalPrice - b.finalPrice))
        }
    }

    return (
        orderId 
            ? <Order order={orders.find((order) => order.id === orderId)} goBack={() => setOrderId('')}/> 
            : 
            <div style={{margin: '0 100px'}} className="main-block">
                <div className="buttons">
                    <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}  onClick={() => setVisibleOrders('all')}> Всі </button>
                    <button className={`btn ${filter === 'withoutRepair' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setVisibleOrders('withoutRepair')}> Неназначені </button>
                    <button className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}  onClick={() => setVisibleOrders('completed')}> Завершені </button>
                    <button className={`btn ${filter === 'NotCompleted' ? 'btn-primary' : 'btn-secondary'}`}  onClick={() => setVisibleOrders('NotCompleted')}> Незавершенні </button>
                </div>
                <table className="table table-hover todo-table">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">Номер</th>
                            <th scope="col">Клієнт</th>
                            <th scope="col">Виконавець</th>
                            <th scope="col">Вартість</th>
                            <th scope="col">Кінцева дата</th>
                            <th scope="col">Завершений</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            visibleOrders.map((order, ind) => (
                                <tr key={ind}>
                                    <td>{ind + 1}</td>
                                    <td>{order.clientEmail}</td>
                                    <td>{order.repairEmail || ' --- '}</td>
                                    <td>{order.finalPrice}</td>
                                    <td>{order.finishTime && order.finishTime.split(' ')[0]}</td>
                                    <td>{order.isFinished ? 'Так' : 'Ні'}</td>
                                    <td> <button className='btn btn-secondary' onClick={() => setOrderId(order.id)}> Редагувати </button></td>
          
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
    )
}

export default Orders