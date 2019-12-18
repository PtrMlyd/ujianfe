import React, {Component} from 'react';
// import {Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Axios from 'axios';
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom' 
// import {onRegisterSuccess} from './../redux/actions'
import {connect} from 'react-redux'
import {APIURL} from '../support/ApiUrl'
import { 
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core'
import {
    Modal,
    ModalBody,
    ModalFooter
} from 'reactstrap'


//ambil input value
// password dan confirm password harus sama
// klik register
// di check username udah ada atau belum di json server
// kalau udah ada munculkan mirror

class Register extends Component {
    state = { 
        dataUser:[],
        modalLogin:false,
        valid:'',
        loading:false
        
     }

    componentDidMount() {
        console.log("ini masuk component didmount")
        Axios.get(`${APIURL}users/`)
        .then((res)=>{
            this.setState({
                dataUser:res.data
            }) 
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

     onRegisterClick=()=>{
        console.log("ini masuk register")
        var iniRefs=this.refs

        var username=iniRefs.username.value
        var password=iniRefs.password.value
        var copassword=iniRefs.copassword.value
        var role="2"
        var data={
            username,
            password,
            role
        }
        
        this.setState({loading:true})
        Axios.get(`${APIURL}users?username=${username}`)
        .then((res)=>{
            if(res.data.length){
                this.setState({valid:"- Username telah terdaftar"})
                console.log("ini masuk username telah digunakan")
            }
            else if(copassword!==password){
                console.log(copassword)
                 this.setState({valid:"- confirm Password dan Password Harus Sama"})
                console.log("ini masuk password tidak sama")
            }else if(res.data.length===0){
                  console.log(copassword)
                 this.setState({valid:"- input tidak boleh kosong"})
                console.log("ini masuk harus di isi")
            }else {
                Axios.post(`${APIURL}users`,data)
                .then(()=>{
                    Axios.get(`${APIURL}users`)
                    console.log("ini masuk berhasil post ke db.json")
                    .then((res1)=>{
                        this.setState({dataUser:res1.data})
                        this.setState({loading:false})
                        console.log(this.state.dataUser)
                    }).catch((err1)=>{
                        console.log(err1)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }).catch((err)=>{
            console.log("ini masuk err"+err)
        })

     }
    render() { 
        if(this.props.AuthLog){
            return(
                 <Redirect to={'/'}/>
            )
        }
        return ( 
            <div className="mx-5 mt-4">
                <center><h1>REGISTER</h1></center>
                <center><p className="hint-text">Create your account. It's free and only takes a minute.</p></center>
                <div className="pt-3 px-5">
                    <input 
                        ref="username"
                        type="text" 
                        className="form-control" 
                        name="username" 
                        placeholder="input your Username" 
                        required="required" />
                </div>
                <div className="pt-3 px-5">
                    <input 
                        ref="password"
                        type="password" 
                        className="form-control" 
                        name="password" 
                        placeholder="input your Password" 
                        required="required" />
                </div>
                <div className="pt-3 px-5">
                    <input 
                        ref="copassword"
                        type="password" 
                        className="form-control" 
                        name="confirm_password" 
                        placeholder="Confirm your Password" 
                        required="required" />
                </div>        
                <div className="pt-3 px-5">
                    <label className="checkbox-inline"><input type="checkbox" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                </div>
                <div className="pt-3 px-5">
                    <button 
                        onClick={this.onRegisterClick} 
                        className="btn btn-success btn-block btn-lg">
                            Register Now
                    </button>
                </div>
                {
                    this.state.valid===''?
                    null
                    :
                    <div className="alert alert-danger pt-3 mx-5">
                        {this.state.valid} <span onClick={()=>this.setState({valid:''})} className='float-right font-weight-bold'>X</span>
                    </div>
            
                }
                <div className="text-center">
                    Already have an account? <Link to={'/login'} >Sign In</Link>
                </div>
            </div>
         );
    }
}

export default Register;