import React,{Fragment, useEffect, useState} from 'react'
import '../App.css'
import MetaData from './layouts/MetaData'
import { useDispatch,useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './products/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const {createSliderWithTooltip} = Slider
const Range=createSliderWithTooltip(Slider.Range)

const Home = () => {

  const alert=useAlert()
  const {keyword}=useParams()
  const dispatch = useDispatch()
  const {products,loading,error,productCount,resPerPage}=useSelector(state=>state.products)
  const [currentPage,setCurrentPage]=useState(1)
  const [price,setPrice]=useState([1,10000])

  useEffect(()=>{
    if(error){
      alert.success(error)
      return alert.error(error)
    }
    dispatch(getProducts(keyword,currentPage,price))
    
  },[dispatch,alert,error,currentPage,keyword,price])

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
        keyword ?
        (
            <Fragment>
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
                  <Range
                    marks={{
                      1:'$1',
                      10000:'$10000'
                    }}
                    min={1}
                    max={10000}
                    defaultValue={[1,10000]}
                    tipFormatter={value=>`$${value}`}
                    tipProps={
                      {
                        placement:"top",
                        visible:true
                      }
                    }
                    value={price}
                    onChange={price=>setPrice(price)}


                  />
                

                </div>
              </div>
              <div className="col-6 col-md-9">
                    <div className="row">
                    {products && products.map(product => (
            <Product key={product._id} product={product}  />))
                  }
                    </div>                  
                  </div>
            </Fragment>
          ) :(
            products && products.map(product => (
            <Product key={product._id} product={product}  />
  
          ))

        )
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