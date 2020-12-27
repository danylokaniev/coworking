import './styles.css'

export default function Select(props){
    const { state='', alt='', onChange, errorInfo='', size, required=true, opts, value, color = 'white', name} = props
    return(
        <div className="select">
            <select required={required} onChange={onChange} value={value} name={name}>
                <option value="" disabled hidden> Виберіть варіант </option>
                { opts.map((opt, ind) => <option key={ind} value={opt.value || opt.text}> {opt.text} </option>) }
            </select>
            <label> { alt }  </label>
            {/* <span>{errorInfo}</span> */}
        </div>
    )
}
