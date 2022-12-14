import React, { Fragment } from 'react'
import '../../App.css'
import {useNavigate,Link} from 'react-router-dom'
import Search from './Search'

const Header = () => {

  const history=useNavigate()
  return (
    <Fragment>
          <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            {/* <img src="/images/logo.png"  alt=""/> */}
            <h2 className='mlogo'>SHOP PIE</h2>
            </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        {/* <Routes>
        <Route render={({history})=><Search history={history}/>}/>
        </Routes> */}
        <Search history={history}/>
      </div> 

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/login" className="btn mr-5" id="login_btn">Login</Link>

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav>
    </Fragment>
  )
}

export default Header