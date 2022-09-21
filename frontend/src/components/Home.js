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
  const {products,loading,error,productCount,resPerPage,filterProductsCount}=useSelector(state=>state.products)
  const [currentPage,setCurrentPage]=useState(1)
  const [price,setPrice]=useState([1,10000])
  const [category,setCategory]=useState('')
  const [rating,setRating]=useState()

  const categories=[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
  ];

  useEffect(()=>{
    if(error){
     
      return alert.error(error)
    }
    dispatch(getProducts(keyword,currentPage,price,category,rating))
    
  },[dispatch,alert,error,currentPage,keyword,price,category,rating])

  function setCurrentPageNo(pageNumber){
  setCurrentPage(pageNumber)
  }
  let count=productCount
  if(keyword){
    count=filterProductsCount
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
                  <hr className='my-5'/>
                    <h4 className='mb-3'>Categories</h4>
                    <ul className='pl-0'>
                      {categories.map(item=>
                      (
                        <li
                      style={{cursor:'pointer',listStyleType:'none'}}  
                        key={item}
                        onClick={()=>setCategory(item)}
                        >{item}</li>
                        
                      )
                      )}
                    </ul>
                    <hr className='my-3'/>
                    <h4 className='mb-3'>Ratings</h4>
                    <ul className='pl-0'>
                      {[5,4,3,2,1].map(item=>
                      (
                        <li
                      style={{cursor:'pointer',listStyleType:'none'}}  
                        key={item}
                        onClick={()=>setRating(item)}
                        >
                          <div className="rating-outer">
                            <div className="rating-inner"
                             style={{width:`${item*20}%`}} 
                            >

                            </div>
                          </div>

                        </li>
                        
                      )
                      )}
                    </ul>  

                

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
        {resPerPage <= count && (
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