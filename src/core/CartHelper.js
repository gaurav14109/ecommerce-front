export const addItems = (item, next) => {

    let cart = []
    //window object should be there
    if (typeof window !== 'undefined') {

        if (localStorage.getItem('cart')) {

            //to increment the value of convert to object
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        //count in the cart
        cart.push({
            ...item,
            count: 1
        })
        // will return a unique arrays of id, id is of the array Array.from returns a
        // new array new Set returns a  unique id from list again .map return product to
        // cart matched with unique id
        cart = Array
            .from(new Set(cart.map(p => p._id)))
            .map(id => {
                return cart.find(p => p._id === id)//map array got from Array.from
            })
        localStorage.setItem('cart', JSON.stringify(cart)) //setting a item in localStorage
        next() //callback function which will be called where this function is called this will execute that function

    }
}

// json is parse to convert json to object json stringify to convert object to
// json i.e string object Array.from return a new array new set() will create a
// unique value

export const getItemCount = () => {

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {

            return JSON
                .parse(localStorage.getItem('cart'))
                .length
            //parsing json string to jso object
        }
    }

    return 0
}

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {

            return JSON.parse(localStorage.getItem('cart'))
            //parsing json string to jso object
        }
    }

    return 0
}

export const updateItem = (productId, count) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {

            cart = JSON.parse(localStorage.getItem('cart'))

            //parsing json string to jso object
        }

        cart.map((p, i) => {

            if (p._id === productId) {

                cart[i].count = count
            }

        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const removeItem = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {

            cart = JSON.parse(localStorage.getItem('cart'))
            //parsing json string to jso object
        }
        // cart = cart.filter((p)=> (      p._id != productId  ))

        cart.map((p, i) => {

            if (p._id === productId) {

                cart.splice(i, 1)
            }

        })

        localStorage.setItem('cart', JSON.stringify(cart))

    }
    return cart
}

export const emptyCart = next=>{

        if (typeof window !== 'undefined') {

            if(localStorage.getItem('cart').length>0){

                localStorage.removeItem('cart')
                next()
                
            }
        }
}