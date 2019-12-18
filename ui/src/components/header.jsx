import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

//day 15
import {FiShoppingCart} from 'react-icons/fi'
import {MdLocalMovies} from 'react-icons/md'
import {logoutSuccessAction} from './../redux/actions'

    // Axios.get(`${APIURL}users?username=${username}&password=${password}`)


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

const onSignOutClick=()=>{
  localStorage.removeItem('dino') // untuk hapus semua item yang ada di local storage
  props.logoutSuccessAction()
}
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/"><MdLocalMovies style={{fontSize:34}}/>BIOSKOP JC-11</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto " navbar>
            {
              props.userRole==='1'?
                <NavItem className=" mr-2 pt-1">
                  <Link to={'/manageadmin'} style={{textDecoration:"none",color:'#9a9da0'}} className="mr-3">Manage Movie</Link>
                  <Link to={'/manageStudio'} style={{textDecoration:"none",color:'#9a9da0'}} >Manage Studio</Link>
                </NavItem>
              :
              props.userRole==='2'?
                <NavItem className=" mr-2 pt-1">
                  <Link to={'/history'} className=" pt-1 mr-2" style={{textDecoration:"none",color:'#9a9da0'}}> History </Link>
                  <Link to={'/cart'}> <FiShoppingCart style={{fontSize:28}} /></Link>
                </NavItem>
              :
                null
            }
            {
              props.namauser===''?
                <NavItem className='mr-2 pt-0'>
                  <Link to={'/register'} style={{textDecoration:"none",color:'#9a9da0'}} className="mr-4">Register</Link>
                  <Link to={'/login'} style={{textDecoration:"none",color:'#9a9da0'}}>Login</Link>
                </NavItem>
                :
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className='mr-2 pt-1'>
                    {props.namauser}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    <Link to={'/resPas'} >Reset Password</Link> 
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onSignOutClick}>
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}



const MapstateToprops=(state)=>{
  return{
      // Auth:state.Auth.login,
      namauser:state.Auth.username,
      userRole:state.Auth.role,
      userCart:state.Auth

  }
}
export default connect(MapstateToprops,{logoutSuccessAction}) (Header);