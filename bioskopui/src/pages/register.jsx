// import React from 'react';
// // import {Paper} from '@material-ui/core'
// import {Link} from 'react-router-dom'
// import Axios from 'axios';
// import Loader from 'react-loader-spinner'
// import {Redirect} from 'react-router-dom' 
// import {OnRegistersuccess} from './../redux/actions'
// import {connect} from 'react-redux'
// //ambil input value
// // password dan confirm password harus sama
// // klik register
// // di check username udah ada atau belum di json server
// // kalau udah ada munculkan mirror
// class Register extends React.Component {
//     state = {
//         error:'',
//         loading:false,
//     }
//     onRegisterchange=()=>{
//         var password=this.refs.password.value
//         var confirm=this.refs.confirm.value
//         if(confirm!==password){
//             this.setState({error:'Password and confirm password must be same'})
//         }
//         if(confirm===''){
//             this.setState({error:''})
//         }
//         if(confirm===password){
//             this.setState({error:''})
//         }  
//     }
//     onBtnRegisterclick=()=>{
//         var email=this.refs.email.value
//         var username=this.refs.username.value
//         var password=this.refs.password.value
//         var confirm=this.refs.confirm.value
//         if(username===''||password===''||confirm===''||email===''){
//             this.setState({error:'Semua Form Harus di Isi'})
//         }else{
//             if(confirm!==password){
//                 this.setState({error:'Password and confirm password must be same'})
//             }else{
//                 this.setState({loading:true})
//                 //ngecek username udah ada atau belum
//                 Axios.get('http://localhost:2000/users?username='+username)
//                 .then((res)=>{
//                     if(res.data.length>0){
//                         this.setState({loading:false})
//                         this.setState({error:'username has been taken'})
//                     }else{
//                         Axios.post('http://localhost:2000/users',{username,password,email})
//                         .then((res)=>{
//                             this.props.OnRegistersuccess(res.data)
//                             localStorage.setItem('terserah',res.data.username)
//                         })
//                         .catch((err)=>{
//                             console.log(err);
//                         })
//                     }
//                 })
//                 .catch((err)=>{
//                     console.log(err);
//                 })
//             }

//         } 
//     }
//     render() {
//         if(this.props.user.username!==''){
//             return(<Redirect to='/'></Redirect>)
//         } 
//         return (
//             <div className='mt-0'>
//                 <div className="container">
//                     <div className='row justify-content-center mt-5'>
//                         <div className="col-md-6 p-4">
//                             <div className=' px-5 py-5 bg-login' square={false}>
                                
//                                     <h1>Register</h1>
                                
//                                 <input type="text" ref='email' className=' mt-3 input-data  pl-1' placeholder='Email ex:example@'/>
//                                 <input type="text" ref='username' className=' mt-3 input-data  pl-1' placeholder='UserName'/>
//                                 <input type='password' ref='password' className=' mt-3 input-data  pl-1' placeholder='Password'/>
//                                 <input type="password" onChange={this.onRegisterchange} ref='confirm' className=' mt-3 input-data  pl-1 mb-3' placeholder='Confirm Password'/>
//                                 {
//                                     this.state.error===''?null:
//                                     <div className='alert alert-danger'>{this.state.error} <span onClick={()=>this.setState({error:''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span> </div>
//                                 }
//                                 {
//                                     this.state.loading===false?<input type='button' onClick={this.onBtnRegisterclick} className=' btn-seat rounded-pill' value='Register'/>:
//                                     <Loader type="ThreeDots" color="whitesmoke" />
//                                 }
//                             </div>
//                                 <p className='mt-3' style={{fontStyle:'italic'}}>
//                                     Sudah Punya Akun ?
//                                     <span style={{fontStyle:'normal'}}><Link to='/login'> Masuk Sekarang</Link></span>
//                                 </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//           );
//     }
// }
// const mapStateToProps=(state)=>{
//     return{
//         user:state.auth.register
//     }
// }
 
// export default connect(mapStateToProps,{onRegisterSuccess})(Register);