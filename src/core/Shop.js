import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import Card from './Card'
import {getCategories} from './ApiCore'
import Checkbox from './CheckBox'
import RadioBox from './RadioBox'
import {prices} from './FixedPrices'
import {getFilteredProduct} from './ApiCore'

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [myFilters, setMyFilters] = useState({

        filters: {
            category: [],
            price: []
        }
    })
    const [filtered, setfilteredResult] = useState([])
    const init = () => {

        getCategories().then(data => {

            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }
    useEffect(() => {

        init()
        loadFilteredResult(myFilters.filters)

    }, [])

    const handleFilter = (filters, filterBy) => {

        const newfilters = {
            ...myFilters
        }

        if (filterBy === 'price') {
            const price = handlePrice(filters)
            newfilters.filters[filterBy] = price

        } else {
            newfilters.filters[filterBy] = filters
        }

        setMyFilters(newfilters)
        loadFilteredResult(myFilters.filters)
        //if price only based on price change will be there

    }

    const loadFilteredResult = (newFilters) => {
        getFilteredProduct(skip, limit, newFilters).then(data => {

            if (data.error) {
                setError(data, error)
            } else {

                setfilteredResult(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }
    const loadMore = () => {
        const toSkip = skip + limit
        getFilteredProduct(toSkip, limit, myFilters.filters).then(data => {
            
            if (data.error) {
                setError(data, error)
            } else {

                setfilteredResult([...myFilters, data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = ()=>{
        //return load more buttin when size > 0 size >limit evry load will change size to
        size >0 && size >= limit && (
            <button className='btn btn-warning mb-5'>Load more</button>
        )
    }
    const handlePrice = value => {
        const data = prices
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {

                array = data[key].price
            }
        }
        return array
    }

    return <Layout
        title='Shop Page'
        description='Search and find book of your choice'
        className={'container-fluid'}>
        <div className='row'>

            <div className='col-4'>
                <h4>Filter by categories</h4>
                <ul>
                    {/* As we are passing filter */}
                    <Checkbox
                        categories={categories}
                        handleFilter={filters => handleFilter(filters, 'category')}/>
                </ul>
                <h4>Filter by Price</h4>

                {/* As we are passing filter */}
                <RadioBox
                    prices={prices}
                    handleFilter={filters => handleFilter(filters, 'price')}/>

            </div>
            <div className='col-8'>

                <div className='row'>
                    {filtered.map((p, i) => (
                    <div key = {i} className='col-4 mb-3'>
                    <Card product={p}/>
                    </div>
                    ))}
                </div>
                {loadMoreButton()} 
                {/* will shown when size is more than the limit which 6 at a time */}
            </div>
        </div>
    </Layout>

}

export default Shop