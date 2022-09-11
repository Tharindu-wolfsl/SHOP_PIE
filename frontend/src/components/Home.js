import React,{Fragment, useEffect} from 'react'
import '../App.css'
import MetaData from './layouts/MetaData'
import { useDispatch,useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './products/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
const Home = () => {

  const alert=useAlert()

  const dispatch = useDispatch()

  const {products,loading,error,productCount}=useSelector(state=>state.products)

  useEffect(()=>{
    if(error){
      alert.success(error)
      return alert.error(error)
    }
    dispatch(getProducts())
  },[dispatch,alert,error])

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
   

 
    </Fragment>
  )
}

export default Home