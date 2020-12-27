
import {useState, useEffect} from 'react'
import { useHistory, Link} from 'react-router-dom'

const Contact = (props) => {

    
    let history = useHistory()
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        let email = localStorage.getItem('email')
        fetch('http://localhost:9000/users/getInfo?' +  new URLSearchParams({
            email : email,
        }))
            .then(response => response.json())
            .then(json => setUserInfo(json))
    }, [])

    return (
        <>
            <button onClick={() => {history.push('/'); localStorage.clear()}} className="btn btn-primary">
              Log Out
            </button>
        </>
    )
}

export default Contact