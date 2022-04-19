import React from 'react'; 

import productsList from '../../Assets/Shop.data.json'


import Product from '../product/product.component';

const ProductsList = () => {
  
  return (
    <div>
      <h3>Products Page</h3>
      {
        productsList.map(product => 
          <div key={product.id}>
            <Product product={product}/>
          </div>
          )
      }
    </div>
  )
}

export default ProductsList