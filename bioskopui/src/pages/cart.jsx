import React, { Component } from 'react';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import {Table} from 'reactstrap'
import {connect} from 'react-redux'
import {
    Modal,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import {FaInfo} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'

class Cart extends Component {
    state = { 
        dataCart:null,
        notloginyet:false,
        cartOk:false,
        keLogin:false
    }

    onCartClick=()=>{
        console.log('ini di click')
        if(this.props.AuthLog){
            // this.setState({cartOk:true})
        }else{
            this.setState({notloginyet:true})
        }
    }

    componentDidMount(){
        Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
        .then((res)=>{
            var dataCart=res.data
            // this.setState({dataCart:res.data})
            var qtyArr=[]
            console.log(res.data)
            res.data.forEach(element =>{
                qtyArr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
            })
            var qtyArrFinal=[]
            Axios.all(qtyArr)
            .then((res1)=>{
                res1.forEach((val)=>{
                    qtyArrFinal.push(val.data)
                })
                console.log(qtyArrFinal)
                var dataFinal=[]
                dataCart.forEach((val,index)=>{
                    dataFinal.push({...val, qty:qtyArrFinal[index]})
                })
                console.log(dataFinal)
                this.setState({
                    dataCart:dataFinal
                })
            }).catch((err1)=>{
                console.log(err1+'Server Error ComponentDidMount err1')
            })

        }).catch((err)=>{
            console.log(err+'Server Error ComponentDidMount err')
        })
    }
    
    renderCart=()=>{
        if(this.state.dataCart!==null){
            if(this.state.dataCart.length===0){
                return (
                    <tr>
                        <td colspan='6'>
                            <center>
                                <h2>Your Basket is Empty</h2>
                            </center>
                        </td> 
                    </tr>
                )
            }
            return this.state.dataCart.map((val,index)=>{
                return(
                    <tr key={index}>
                        <td style={{width:10}}>{index+1}</td>
                        <td style={{width:800}}>{val.movie.title}</td>
                        <td style={{width:100}}>{val.jadwal}</td>
                        <td style={{width:100}}>{val.qty.length}</td>
                        <td style={{width:50}}>
                            <FaInfo style={{fontSize:20}}/>
                            <MdDelete style={{fontSize:25}}/>
                        </td>
                        <td style={{width:200}}></td>
                    </tr>
                )
            })
        }
    }

    render() { 
        if(this.props.UserId){
            if(this.state.kelogin){
                return <Redirect to={'/login'}/>
            }
            if(this.state.cartOk){
                return <Redirect to={{pathname:'/cart',state:this.state.datadetailfilm}}/>
            }

            return ( 
                <div>
                    <center>
                        <Table style={{width:600}}>
                            <thead>
                                <tr>
                                    <th style={{width:10}}>No.</th>
                                    <th style={{width:800}}>Title</th>
                                    <th style={{width:100}}>Jadwal</th>
                                    <th style={{width:100}}>Jumlah</th>
                                    <th style={{width:100}}>Action</th>
                                    <th style={{width:200}}>Suspend in</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot>
                                <td colspan='6'>
                                    <button className='btn btn-outline-success' onClick={this.onCartClick}>
                                        Check Out
                                    </button>   
                                </td>
                            </tfoot>
                        </Table>
                    </center>
                </div>
            );
        }else{
            return(
                <div> 404 Not Found </div>
            )
        }
            
    }
}

    const MapstateToprops=(state)=>{
        return{
            AuthLog:state.Auth.login,
            //mengambil ID day 15
            UserId:state.Auth.id
        }
    }
export default connect(MapstateToprops) (Cart);