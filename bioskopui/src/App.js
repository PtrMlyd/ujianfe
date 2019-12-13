import React, { Component } from 'react';
import Header from './components/header'
import Home from './pages/home'
import './App.css';
import {Switch,Route} from 'react-router-dom'
import ManageAdmin from './pages/manageAdmin'
import Login from './pages/login'
import Moviedetail from './pages/movieDetail'
import Belitiket from './pages/beliTiket'
import cart from './pages/cart'
import register from './pages/register'
import {connect} from 'react-redux'
import {LoginSuccessAction} from './redux/actions'
import Axios from 'axios';
import { APIURL } from './support/ApiUrl';


class App extends Component{
  state={
    loading:true
  }

  componentDidMount(){
    var id=localStorage.getItem('dino')
    Axios.get(`${APIURL}users/${id}`)
    .then((res)=>{
      this.props.LoginSuccessAction(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      this.setState({loading:false})
    })
  }


  render(){
    if(this.state.loading){
      return <div>loading</div>
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path={'/'} exact>
            <Home/>
          </Route>
          <Route path={'/manageAdmin'} exact >
            <ManageAdmin/>
          </Route>          
          <Route path='/movieDetail/:id' component={Moviedetail} exact />
          {/* day 15 */}
          <Route path='/cart' component={cart} exact/>
          <Route path='/beliTiket' component={Belitiket} exact/>
          <Route path='/register' component={register} exact/>
          <Route path={'/login'} exact component={Login}/>
        </Switch>
      </div>
    );
  }
}

const MapstateToprops=(state)=>{
  return{
      AuthLog:state.Auth.login
  }
}

export default connect(MapstateToprops,{LoginSuccessAction})(App);
