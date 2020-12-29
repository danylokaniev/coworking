import { useState, useEffect } from 'react'
import Input from '../inputs/Input'

const ClientPlaces = () => {

    const [inputs, changeInputs] = useState({
        startTime: new Date().toJSON().slice(0,10),
        finishTime: '',
        nameOfCompany: '',
    })

    const [currentPlaceId, setCurrentPlaceId] = useState(0)
    const [places, setPlaces] = useState([])
    const [response, setResponse] = useState('')

    useEffect(() => {
        fetch('http://localhost:10000/places?' +  new URLSearchParams({
            token: localStorage.getItem('sessionToken'),
        }))
            .then(response => response.json())
            .then(json => {
                const places = []
                if(json.success)
                    setPlaces(Object.values(json.response).map(place => ({
                        ...place,
                        withClient: place.clientName ? true : false, 
                    })))
            }
            )
            .catch(error => alert(error))


    }, [currentPlaceId])

    const onSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
  

        fetch('http://localhost:10000/places?' +  new URLSearchParams({
            token: localStorage.getItem('sessionToken'),
            startTime: inputs.startTime,
            finishTime: inputs.finishTime,
            nameOfCompany: inputs.nameOfCompany,
            placeId: currentPlaceId,
            clientId: localStorage.getItem('id')
        }), {
            method: 'POST',
        })
            .then(response => response.json())
            .then(json => {
                if(json.success) setResponse('Place was updated')
                else setResponse('Error') 

                setTimeout(() => setResponse(''), 5000)
            })


        changeInputs({
            startTime: new Date().toJSON().slice(0,10),
            finishTime: '',
            nameOfCompany: '',
        })

        

     
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


    const handlePlaceClick = (id) => {

        if(places.find(place => place.id === id).clientName === '') {
            setCurrentPlaceId(id)
        }

    }


    console.log(places)


    return (
        currentPlaceId === 0 
            ? <div className="room">

                {
                    places.sort((a,b) => a.id - b.id).map(place => (
                        <div key={place.id} 
                            className={`place ${place.withClient ? 'withClient' : ''}`}
                            onClick={() => handlePlaceClick(place.id)}>
                            <div>{place.id}</div>
                            <div className={'addPlace'}
                                onClick={() => setCurrentPlaceId(place.id)}>
                                <div>Клієнт: {place.clientName}</div>
                                <div>Назва компанії: {place.nameOfCompany}</div>
                                <div>Місце зайняте до: {place.finishTime?.slice(0, 10)}</div>
                            </div>
                        </div>
                    ))
                }

            </div>

            : <form autoComplete="off" onSubmit={onSubmit} className="main-block">
                <div className="mainTitle">Створити місце, номером {currentPlaceId}</div>
                <Input 
                    placeholder={'Введіть початкову дату'} onChange={handleInputs}  type={'date'}
                    value={inputs.startTime} name={'startTime'} disabled
                />
                <div className="title">Введіть кінцеву дату:</div>
                <Input 
                    placeholder={''} onChange={handleInputs} type={'date'}
                    value={inputs.finishTime} name={'finishTime'}
                />
                <Input 
                    placeholder={'Введіть ім\'я компанії'} onChange={handleInputs}
                    value={inputs.nameOfCompany} name={'nameOfCompany'}
                />
                <button type="submit"  className="btn btn-primary"> Додати місце </button>
                <div className={`response ${response ? ' ' : 'response-hidden'}`}>{response}</div>
                <button type="submit"  className="btn btn-primary" onClick={() => setCurrentPlaceId(0)}> Назад </button>
            </form>
            

    )

}

export default ClientPlaces