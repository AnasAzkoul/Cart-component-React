import React, {useContext} from 'react'; 
 
import { productsContext } from '../../contexts/products.context/products.context';


import Product from '../product/product.component';

const ProductsList = () => {

  const {products} = useContext(productsContext); 
  
  return (
    <div>
      <h3>Products Page</h3>
      {
        products.map(product => 
          <div key={product.id}>
            <Product product={product}/>
          </div>
          )
      }
    </div>
  )
}

export default ProductsList