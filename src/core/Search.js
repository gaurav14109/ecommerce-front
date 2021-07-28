import React, {useState, useEffect} from 'react';
import Card from './Card'
import {getCategories,list} from './ApiCore'


const Search = ()=>{

    const [data, setData] = useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false,
    })
    const {categories, results, searched, search, category} = data
    const LoadCategories = ()=>{

        getCategories().then(res=>{
            if (res.error){
                console.log(res.error)
            }
            else{
                setData({...data, categories:res})
            }
        })
    }

    
    //we are defining a function inside 
    useEffect(()=>{
        LoadCategories()

    },[])
    
    const searchData = ()=>{
        //need to create a api for data
        //seacrh name
        if(search){ 
            list({search:search||undefined, category:category}).then(res=>{

                if (res.error){
                    console.log(res.error)
                }else{
                   
                    setData({...data, results:res, searched:true})
                    
                }
            })
        }
    }
    const searchSubmit = (e)=>{
        e.preventDefault()

        searchData()
    }

    const searchedMessage = (searched, results)=>{
       
        if (searched && results.length> 0){
            return `Found ${results.length} products`
        }
        if (searched && results.length< 1){
            return `No products found`
        }
          
      
    }

    const handleChange = name=> (event)=>{

        setData({...data, [name]:event.target.value, searched:false})
    }
    const searchForm = ()=>(
        <form onSubmit={searchSubmit}>
           <span className = 'input-group-text'>
               <div className = 'input-group input-group-lg'>
               <div className = 'input-group-prepend'>
                   <select className ='btn mr-2' onChange={handleChange('category')}>

                   
                       <option value='All'>Pick Category</option>
                       {categories.map((c,i)=>(
                           <option key={i} value={c._id}>{c.name}</option>
                       ))}
                   </select>
               </div>
               <input type="text" className = 'form-control' onChange ={handleChange('search')} placeholder='Search by Name'/>
               </div>
               <div className = 'btn input-group-append' style = {{border:'none'}}>
                   <button className = 'input-group-text'>Search</button>
               </div>
           </span>
        </form>
    )
    const searchedProducts = (results=[])=>{
        return (
            <div>
                <h2 className = 'mt-4 mb-4'>{searchedMessage(searched, results)}</h2>
        <div className='row'>
                {results.map((product,i)=>(
                    <Card key={i} product={product} />
                ))}
        </div>
        </div>
        )
    }
    
   return  <div>
      
       <div className = 'container mb-3'>{searchForm()}</div>
       
        <div className = 'container-fluid mb-3'>
            {searchedProducts(results)}
        </div>
   </div>


}

export default Search;