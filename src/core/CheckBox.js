import React, {useEffect, useState} from 'react';

const Checkbox = ({categories, handleFilter}) => {
    const [checked, setChecked] = useState([])


    const handleToggle = c=> ()=> {

        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]

        if (currentCategoryId === -1){

            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
            //splice one item
        }
        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilter(newCheckedCategoryId)

    }
    return categories.map((c, i)=>(

        <li key={i}  className = 'list-unstyled'>
                <input onChange = {handleToggle(c._id)} type="checkbox" className = 'form-check-input' 
                value = {checked.indexOf(c._id) === -1}/>
                <label className = 'form-check-label'>{c.name}</label>
        </li>
    ))

}

export default Checkbox;