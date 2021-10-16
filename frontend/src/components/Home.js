// eslint-disable-next-line
import React, { Fragment,useEffect, useState } from 'react'
import Metadata from './layouts/Metadata'
import { useDispatch,useSelector} from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';


const {createSliderWithTooltip}=Slider;
const Range=createSliderWithTooltip(Slider.Range)


const Home=({match})=>{

    const [currentPage,setCurrentPage]=useState(1)

    const [price,setPrice]=useState([1,5000]);

    const alert=useAlert();
    const dispatch=useDispatch();

    // pull the products from the state
    const {loading,products,error,productsCount,resPerPage}=useSelector(state=>state.products)

    const keyWord=match.params.keyWord
    useEffect(() => {
        if(error){  
               return alert.error(error)
        }
        dispatch(getProducts(keyWord,currentPage,price));


    },[dispatch,alert , error, keyWord, currentPage,price])

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

                        {keyWord? (
                            <Fragment>
                                <div className="col-6 col-md-3 mt-5 mb-5">
                                    <div className="px-5">
                                        <Range 
                                            marks={{
                                                1:`$1`,
                                                5000:`$5000`
                                            }}
                                            min={1}
                                            max={5000}
                                            defaultValue={[1,5000]}
                                            tipFormatter={value=>`$${value}`}
                                            tipProps={{
                                                placement:"top",
                                                visible:true
                                            }}
                                            value={price}
                                            onChange={price=>setPrice(price)}
                                         />
                                    </div>
                                </div>
                                <div className="col-6 col-md-9">
                                    <div className="row">
                                     {products && products.map(product=>( 
                                    <Product key ={product._id} product={product} col={4}/>   
                                     ))}
                                    </div>
                                </div>
                            </Fragment>

                        ):(
                            
                            products && products.map(product=>( 
                            <Product key ={product._id} product={product} col={3}/>
                        ))                             
                        )}

                            
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