import React, { Fragment } from 'react'
import Metadata from './layouts/Metadata'

const Home=()=>{
    return(
        <Fragment>
            <Metadata title={'Buy Best Product Online'}/>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                    <div className="card p-3 rounded">
                        <img
                        className="card-img-top mx-auto"
                        src="https://3.bp.blogspot.com/-sjNz0YnkCh4/WSalnGCW8kI/AAAAAAAA7TA/HvaVb7FNLSgsGR9GNByZLcXL0LhZ6wybwCEw/s1600/1495119495316.jpg" alt="item name"
                        />
                        <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <a href="">Peach Hankies</a>
                        </h5>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                            <div className="rating-inner"></div>
                            </div>
                            <span id="no_of_reviews">(5 Reviews)</span>
                        </div>
                        <p className="card-text">$45.67</p>
                        <a href="#" id="view_btn" className="btn btn-block">View Details</a>
                        </div>
                    </div>
                    </div>
                </div>
        </section>
        </Fragment>
         )
}

export default Home