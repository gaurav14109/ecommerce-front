import React from 'react';
import {API} from '../config';

const ShowImage = ({item, url})=>(

//show image separately
    <div className="product-img">
        <img src={`${API}/${url}/photo/${item._id}`}
        alt={item.name} className="mb-3"
        style={{maxHeight:'100px', maxWidth:'100%'}}/>
    </div>
)


export default ShowImage;

