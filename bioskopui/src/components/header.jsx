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
import { lime } from '@material-ui/core/colors';
// import Axios from 'axios';
// import { APIURL } from '../support/ApiUrl';




const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // const onSignOutClick=()=>localStorage.clear()
    // Axios.get(`${APIURL}users?username=${username}&password=${password}`)
    
  

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto " navbar>
            <NavItem className=" mr-2 pt-2">
              <Link to={'/manageadmin'} style={{textDecoration:"none",color:'#9a9da0'}}>Manage Admin</Link>
            </NavItem>
            {props.namauser===''?
              <NavItem>
                <Link to={'/login'} style={{textDecoration:"none",color:'#9a9da0'}}>Login</Link>
              </NavItem>
            //   :
            //   null
            // }
            //   {
            //     props.namauser===''?
            //     null
                :
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {props.namauser}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      View Profil
                    </DropdownItem>
                    <DropdownItem>
                      View Cart
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
  localStorage.clear()
  window.location.reload()
}
    // Axios.get(`${APIURL}users?username=${username}&password=${password}`)

const MapstateToprops=(state)=>{
  return{
      namauser:state.Auth.username

  }
}
export default connect(MapstateToprops) (Header);