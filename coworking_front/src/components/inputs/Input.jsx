import './styles.css'
import {useState} from 'react'

const Input = (props) => {
    const {onChange, required = true, type = 'text', placeholder, name, value, disabled = false} = props
    const [showPass, toggleShowPass] = useState(false)
    let minValue = ''
    if(type === 'date')
        minValue = new Date().toJSON().slice(0,10)
    if(type === 'number')
        minValue = 0
    return (
        <div className="form__group field"  disabled={disabled}>
            <input type={showPass ? 'text' : type} className="form__field" 
                name={name} required={required} id={name} autoComplete="off"
                onChange={onChange} value={value} disabled={disabled} min={minValue}/>
            <label className="form__label" htmlFor={name}>{placeholder}</label>
            {
                (type === 'password' && value) && (showPass ? 
                    <svg width="24" height="24" fill="none" onClick={() => toggleShowPass(state => !state)}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.0282 16.3483C21.3192 15.1505 22.3428 13.6676 23 12C21.27 7.61 17 4.5 12 4.5C10.8396 4.5 9.71861 4.66749 8.65951 4.97961L10.3215 6.64164C10.8687 6.54822 11.4297 6.5 12 6.5C15.79 6.5 19.17 8.63 20.82 12C20.2658 13.1318 19.5165 14.1238 18.6221 14.9422L20.0282 16.3483ZM15.9883 12.3084C15.996 12.2066 16 12.1038 16 12C16 9.792 14.208 8 12 8C11.8962 8 11.7934 8.00396 11.6916 8.01173L15.9883 12.3084ZM9.59259 8.806L15.194 14.4074C14.4637 15.3746 13.3044 16 12 16C9.792 16 8 14.208 8 12C8 10.6956 8.62543 9.53633 9.59259 8.806ZM8.0896 7.30301C5.97949 8.21408 4.22967 9.85612 3.18 12C4.83 15.37 8.21 17.5 12 17.5C13.7896 17.5 15.4878 17.0251 16.9556 16.169L18.401 17.6144C16.5567 18.8073 14.3597 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.05591 9.32055 4.05805 7.11794 6.59486 5.80827L8.0896 7.30301Z" fill="#828282"/>
                        <line x1="2.70711" y1="3.29289" x2="20.7071" y2="21.2929" stroke="#828282" strokeWidth="2"/>
                    </svg> 
                    : 
                    <svg width="24" height="24" fill="none" onClick={() => toggleShowPass(state => !state)}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.79 17.5 12 17.5C8.21 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5ZM16 12C16 9.792 14.208 8 12 8C9.792 8 8 9.792 8 12C8 14.208 9.792 16 12 16C14.208 16 16 14.208 16 12Z" fill="#828282"/>
                    </svg>)
            }
        </div>
    )
}

export default Input