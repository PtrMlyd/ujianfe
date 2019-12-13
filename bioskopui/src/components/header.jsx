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




const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // const onSignOutClick=()=>localStorage.clear()
    // Axios.get(`${APIURL}users?username=${username}&password=${password}`)
    
  

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/"><MdLocalMovies style={{fontSize:34}}/>BIOSKOP JC-11</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto " navbar>
            <NavItem className=" mr-2 pt-1">
              <Link to={'/manageadmin'} style={{textDecoration:"none",color:'#9a9da0'}}>Manage Admin</Link>
            </NavItem>
            <NavItem className=" mr-2 pt-1">
              <Link to={'/cart'}> <FiShoppingCart style={{fontSize:28}}/></Link>
            </NavItem>
            {props.namauser===''?
              <NavItem className='mr-2 pt-1'>
                <Link to={'/login'} style={{textDecoration:"none",color:'#9a9da0'}}>Login</Link>
              </NavItem>
                :
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className='mr-2 pt-1'>
                    {props.namauser}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      View Profil
                    </DropdownItem>
                    <DropdownItem>
                    <Link to={'/cart'} >View Cart</Link> 
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link to='/' onClick={()=>onSignOutClick()}>Sign Out</Link>
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

const onSignOutClick=()=>{
  localStorage.clear() // untuk hapus semua item yang ada di local storage
  window.location.reload()
}
    // Axios.get(`${APIURL}users?username=${username}&password=${password}`)

const MapstateToprops=(state)=>{
  return{
      namauser:state.Auth.username

  }
}
export default connect(MapstateToprops) (Header);