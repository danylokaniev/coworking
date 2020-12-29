import { useState, useEffect } from 'react'
import Input from '../inputs/Input'

const Coworking = () => {

    const [inputs, changeInputs] = useState({
        amount: 0,
    })

    const [update, shouldUpdate] = useState(false)
    const [response, setResponse] = useState('')
    const [places, setPlaces] = useState([])

    const onSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if(inputs.amount > 10) {
            alert('Ви не  можете додати більше 10 місць одразу')
            return
        }

        fetch('http://localhost:10000/places/add?' +  new URLSearchParams({
            token: localStorage.getItem('sessionToken'),
            amount: inputs.amount,
        }), {
            method: 'POST',
        })
            .then(response => response.json())
            .then(json => {setResponse(json); shouldUpdate(e => !e); changeInputs({})})
            .catch(error => alert(error))
    }


    useEffect(() => {
        fetch('http://localhost:10000/places?' +  new URLSearchParams({
            token: localStorage.getItem('sessionToken'),
        }))
            .then(response => response.json())
            .then(json => {
                const places = []
                if(json.success)
                    setPlaces(Object.values(json.response))
            }
            )
            .catch(error => alert(error))


    }, [update])

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

    console.log(inputs)
    console.log(places)



    return (
        <>
            <div className="mainTitle">Додати місця</div>
            <form autoComplete="off" onSubmit={onSubmit} className="main-block">
                <Input
                    placeholder={'Введите amount'} onChange={handleInputs}
                    value={inputs.amount} name={'amount'}
                />
                <div>
                    <button type="submit" className="btn btn-primary btn-block">Додати</button>
                </div>
            </form>
            <div className="room">

                {
                    places.map(place => (
                        <>
                            <div key={place.id} className="place">
                                <div>{place.id}</div>
                                <div className="addPlace">
                                    <div>{place.startTime}</div>
                                    <div>{place.finihTime}</div>
                                    <div>{place.clientId}</div>
                                </div>
                            </div>
                        </>
                    ))
                }

            </div>

        </>
    )

}

export default Coworking