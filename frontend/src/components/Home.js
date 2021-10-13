// eslint-disable-next-line
import React, { Fragment,useEffect, useState } from 'react'
import Metadata from './layouts/Metadata'
import { useDispatch,useSelector} from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'

const Home=()=>{

    const [currentPage,setCurrentPage]=useState(1)
    const alert=useAlert();
    const dispatch=useDispatch();

    // pull the products from the state
    const {loading,products,error,productsCount,resPerPage}=useSelector(state=>state.products)

    useEffect(() => {
        // if(error){  
            //    return alert.error(error)
        // }
        dispatch(getProducts(currentPage));


    },[dispatch,alert , error,currentPage])

    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    }
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
                {resPerPage<=productsCount &&(
                    <div className="d-flex justify-content-center mt-5">
                     <Pagination
                         activePage={currentPage}
                         itemsCountPerPage={resPerPage}
                         totalItemsCount={productsCount}
                         onChange={setCurrentPageNo}
                         nextPageText={'Next'}
                         prevPageText={'Previous'}
                         firstPageText={'First'}
                         lastPageText={'Last'}
                         itemClass="page-item"
                         linkClass="page-link"
                     />           
                </div>
                )}
          </Fragment>  
        )}
            
        </Fragment>
         )
}

export default Home