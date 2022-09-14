import React,{Fragment, useEffect, useState} from 'react'
import '../App.css'
import MetaData from './layouts/MetaData'
import { useDispatch,useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './products/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'

const Home = () => {

  const alert=useAlert()

  const dispatch = useDispatch()

  const {products,loading,error,productCount,resPerPage}=useSelector(state=>state.products)

  const [currentPage,setCurrentPage]=useState(1)

  useEffect(()=>{
    if(error){
      alert.success(error)
      return alert.error(error)
    }
    dispatch(getProducts(currentPage))
  },[dispatch,alert,error,currentPage])

  function setCurrentPageNo(pageNumber){

    setCurrentPage(pageNumber)

  }

  return (

    
    <Fragment>

      {
        loading ? <Loader/>
        :(<Fragment>
          
        <MetaData title={'Buy best product online'} />
<h1 id="products_heading">Latest Products</h1>

<section id="products" className="container mt-5">
  <div className="row">
    {
      products && products.map(product => (


        <Product key={product._id} product={product}  />


      ))
    } 
      </div>
        </section>
          
          
          </Fragment>)    
      }
   
      <div className="d-flex justify-content-center mt-5">
        {resPerPage <= productCount && (
                <Pagination

                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                
                />
        )}
  


      </div>
      


     
    </Fragment>
  )
}

export default Home