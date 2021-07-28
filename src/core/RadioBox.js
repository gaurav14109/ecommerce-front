import React,{useState, useEffect} from 'react';

const RadioBox = ({prices,handleFilter})=>{

    const [value, setValue] = useState(0)

    const handleChange = (e)=>{

        handleFilter(e.target.value)

        setValue(e.target.value)
    }
    return prices.map((price,i)=>(
    <div key={i}>
    <input name ={price} onChange = {handleChange} type="radio" className = 'mr-2 ml-4' 
    value = {`${price._id}`}/>
    <label className = 'form-check-label'>{price.name}</label>
    </div>))

}

export default RadioBox