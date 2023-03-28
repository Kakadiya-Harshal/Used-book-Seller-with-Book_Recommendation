
//This is the Card which display the Product Image , Name ,Price 

import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Product = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product._id}`}>

        <Card className='my-3 p-3 rounded'>
          <Card.Img className='card-image' src={product.images[0].image1} />

          <Card.Body>
            <Card.Title as='p' className='name-label' style={{ background: 'black' , fontSize:'15px' }}>
              <strong >{product.name}</strong>
            </Card.Title>

            <Card.Text as='h3' style={{ color: 'green',fontSize :'15px' }}>Rs {product.Cost.price}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  )
}

export default Product
