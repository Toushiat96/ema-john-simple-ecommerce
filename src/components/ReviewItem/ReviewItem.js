import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity,key,price } = props.product;
    const reviewStyle ={
     borderBottom :'1px solid lightgray',
     marginBottom :'5px',
     paddingBottom :'5px',
     marginLeft :'200px'
    };
    return (
        <div  style={reviewStyle} className="reviewItem">

            <h4 className="product-name">{name} </h4>
            <p> Quantity :{quantity}</p>
    <p><small>$ {price}</small></p>
            <br/>
            <button 
            onClick={ () => props.removeItem(key)}
            className="main-button">Remove</button>

        </div>
    );
};

export default ReviewItem;