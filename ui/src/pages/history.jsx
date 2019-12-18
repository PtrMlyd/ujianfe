import React, { Component } from 'react';
import {Table} from 'reactstrap'
import {
    Modal,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import { connect } from "react-redux";
import Axios from "axios";
import {APIURL} from '../support/ApiUrl'

class History extends Component {
    state = { 
        dataCart:[], 
        indexCart:0
     }

    componentDidMount(){
        Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.UserId}&bayar=true`)
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
    
    renderHistory=()=>{
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
                        <td style={{width:800}}>{val.tanggal}</td>
                        <td style={{width:100}}>{val.totalHarga}</td>
                        <td>
                            <button className="btn btn-outline-primary btn-sm mr-3">Details</button>
                        </td>
                    </tr>
                   
                )
            })
        }
    }

    render() { 
        if(this.props.UserRole==="2"){
            return ( 
                <div>
                    {/* <Modal>
                        <ModalBody>
                            <Table>
                                <tr>
                                    <td> No.</td>
                                    <td> Juduol Film</td>
                                    <td> Jumlah Tiket</td>
                                    <td> Harga</td>
                                </tr>
                                <tr>
                                    <td><button className="btn btn-outline-secondary"> Close</button></td>
                                </tr>
                            </Table>
                        </ModalBody>
                    </Modal> */}
                    <center>
                        <Table style={{width:600}}>
                            <thead>
                                <tr>
                                    <th style={{width:10}}>No.</th>
                                    <th style={{width:300}}>Tanggal</th>
                                    <th style={{width:500}}>Total Harga</th>
                                    <th style={{width:100}}>Rincian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderHistory()}
                            </tbody>
                        </Table>
                    </center>
                </div>
            );
        }else{
            return <div> 404 Page Not Found</div>
        }
    }
}
const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        UserRole:state.Auth.role
    }
}
export default connect(MapstateToprops) (History);