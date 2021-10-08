// eslint-disable-next-line
import React, { Fragment,useEffect } from 'react'
import Metadata from './layouts/Metadata'
import { useDispatch,useSelector} from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'

const Home=()=>{

    const alert=useAlert();
    const dispatch=useDispatch();

    // pull the products from the state
    const {loading,products,error,productsCount}=useSelector(state=>state.products)

    useEffect(() => {
        // if(!error){
        //     return alert.success("sujvhhfd")
        // }
        // if(error){  
        //     alert.success("SUcess")
        //    return alert.error(error)
        // }
        dispatch(getProducts());


    },[dispatch,alert , error])
    return(
        <Fragment>
        {loading?<h1><Loader /></h1>:(
          <Fragment>

                <Metadata title={'Buy Best Product Online'}/>
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product=>( 
                            <Product key ={product._id} product={product}/>
                        ))}
                            
                    </div>
                </section>
          </Fragment>  
        )}
            
        </Fragment>
         )
}

export default Home