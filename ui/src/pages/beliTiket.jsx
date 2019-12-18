import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import { APIURL } from '../support/ApiUrl';
//day 14
import Numeral from 'numeral' // ini untuk timer, etc
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import {Redirect, Link} from 'react-router-dom';

class Belitiket extends Component {
    state = {  
        datamovie:{},
        seats:260,
        baris:0,
        booked:[],
        loading:true,
        jam:12,
        pilihan:[],
        //day 14
        harga:0,
        jumlahTiket:0,
        openModal:false,
        deleteModal:false,
        redirectHome:false
    }

    componentDidMount(){
        if(this.props.location.state!==undefined){
            this.onJamchange()
        // }else{
        //     Axios.get(`${APIURL}movies`)
        //     .then((res)=>{
        //         this.setState({datamovies:res.data})
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        }
    }
    onJamchange=()=>{
        var studioId=this.props.location.state.studioId
        var movieId=this.props.location.state.id
        Axios.get(`${APIURL}studios/${studioId}`)
        .then((res1)=>{
            Axios.get(`${APIURL}orders?movieId=${movieId}&jadwal=${this.state.jam}`)
            .then((res2)=>{
                var arrAxios=[]
                res2.data.forEach((val)=>{
                    arrAxios.push(Axios.get(`${APIURL}ordersDetails?orderId=${val.id}`))
                })
                var arrAxios2=[]
                Axios.all(arrAxios)
                .then((res3)=>{
                    console.log(res3)
                    res3.forEach((val)=>{
                        arrAxios2.push(...val.data)
                    })
                    console.log(arrAxios2)
                    this.setState({
                        datamovie:this.props.location.state,
                        seats:res1.data.jumlahKursi,
                        baris:res1.data.jumlahKursi/20,
                        booked:arrAxios2,
                        loading:false
                    })  
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err2)=>{
                console.log(err2)
            })
        }).catch((err1)=>{
            console.log(err1)
        })
    }
    onButtonjamclick=(val)=>{
        this.setState({jam:val,pilihan:[]})
        this.onJamchange()   
    }

    onPilihSeatClick=(row,seat)=>{
        var pilihan=this.state.pilihan
        pilihan.push({row:row,seat})//<-seat:seat bisa juga ditulis begitu 
        this.setState({pilihan:pilihan})
    }
    //day 14
    onOrderClick=()=>{
        var userId=this.props.UserId
        var movieId=this.state.datamovie.id
        var pilihan=this.state.pilihan
        var jadwal=this.state.jam
        var totalHarga=this.state.pilihan.length*25000
        var bayar=false
        var dataOrders={
            userId,
            movieId,
            totalHarga,
            jadwal,
            bayar
        }
        Axios.post(`${APIURL}orders`,dataOrders)
        .then((res)=>{
            console.log(res.data.id)
            var dataOrdersDetail=[]
            pilihan.forEach((val)=>{

                console.log('Masuk Sini '+pilihan)
                //untuk push data ke dalam array dataOrdersDetail
                dataOrdersDetail.push({
                    orderId:res.data.id,
                    seat:val.seat,
                    row:val.row
                })
            })
            console.log(dataOrdersDetail)
            var dataOrderDetail2=[] //lalu kita buat variable baru untuk menyimpan ke db.json
            dataOrdersDetail.forEach((val)=>{ // lalu data yang telah kita push ke dataOrderDetail , kita buat kondisi dimana untuk nilai data orderdetail. kita gantikan/ push data orderdetail2 
                dataOrderDetail2.push(Axios.post(`${APIURL}ordersDetails`,val))
            })
            
            Axios.all(dataOrderDetail2)
            .then((res1)=>{
                console.log(res1)
                this.setState({openModal:true})
            }).catch((err1)=>{
                console.log(err1)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onResetSeatClick=()=>{
        
    }

    renderHargadanQuantity=()=>{
        var jumlahTiket=this.state.pilihan.length
        var harga=jumlahTiket*25000
        // this.setState(harga)
        return(
            <div>
                {jumlahTiket} Tiket X {`Rp ${Numeral(25000).format('0.00')}`}={`Rp. ${Numeral(harga).format(`0.00`)}`}
            </div>
        )
        
    }
    
    onCancelseatClick=(row,seat)=>{
        var pilihan=this.state.pilihan
        var rows=row
        var seats=seat
        var arr=[]
        for (var i=0;i<pilihan.length;i++){
            if(pilihan[i].row!==rows||pilihan[i].seat!==seats){
                arr.push(pilihan[i])
            }
        }
        this.setState({pilihan:arr})
    }

    renderseat=()=>{
        var arr=[]
        for(let i=0;i<this.state.baris;i++){
            arr.push([])
            // console.log(arr.push([]))
            for(let j=0;j<this.state.seats/this.state.baris;j++){
                arr[i].push(1)
                // console.log(arr[i].push(1))
            }
        }
        for(let k =0;k <this.state.booked.length;k ++){
            arr[this.state.booked[k ].row][this.state.booked[k ].seat]=3
        }
        
        for(let a=0;a<this.state.pilihan.length;a++){
            arr[this.state.pilihan[a].row][this.state.pilihan[a].seat]=2
        }
        console.log(this.state.booked)
        var alphabet='abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        var jsx=arr.map((val,index)=>{
            return(
                <div key={index}>
                    {
                        val.map((val1,i)=>{
                            if(val1===3){
                                return(
                                    <button key={i} disabled className='rounded btn-disble mr-2 mt-2 bg-danger text-center'>
                                        {alphabet[index] +(i+1)} 
                                    </button>
                                )
                            }else if(val1===2){
                                return(
                                    <button key={i} onClick={()=>this.onCancelseatClick(index,i)} className='rounded btn-order mr-2 mt-2 btn-pilih text-center'>
                                        {alphabet[index] +(i+1)}
                                    </button>
                                )
                            }
                            return(
                                <button key={i} onClick={()=>this.onPilihSeatClick(index,i)}  className='rounded btn-order mr-2 mt-2 text-center'>
                                    {alphabet[index]+(i+1)}
                                </button>
                            )
                        })
                    }
                </div>
            )
        })
        return jsx
    }
    renderbutton=()=>{
        return this.state.datamovie.jadwal.map((val,index)=>{
            if(this.state.jam===val){
                return(

                    <button className='mx-2 btn btn-outline-primary' disabled>{val}.00</button>  
                )
            }
            return(
                <button className='mx-2 btn btn-outline-primary' onClick={()=>this.onButtonjamclick(val)}>{val}.00</button>
            )
        })
    }
    render(){
        if(this.props.location.state &&this.props.AuthLog){
            if(this.props.userId){
                if(this.state.redirectHome){
                    return <Redirect to={'/'}/>
                }
            }
            return (
                <div>
                    <Modal isOpen={this.state.openModal} center>
                        <ModalBody>
                            Successfully Added to your Cart
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={()=>this.setState({redirectHome:true, openModal:false})} className='btn btn-outline-primary'>OK</button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.deleteModal}>
                        <ModalBody>
                            Are You Sure ? 
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary" onClick={this.onResetSeatClick}> OK </button>
                            <button className="btn btn-danger" onClick={()=>this.setState({deleteModal:false})}> Cancel </button>
                        </ModalFooter>
                    </Modal>
                    <center className='mt-1'>
                        <h2>Order Seat</h2> <br/>
                        <h1>{this.state.datamovie.title}</h1> <br/>
                        {this.state.loading?null:this.renderbutton()} <br/><br/>
                        <div>
                            {this.state.pilihan.length?<button className='btn btn-primary mr-4' onClick={this.onOrderClick} >Order</button> :null}
                            <button className='btn btn-danger'onClick={()=>this.setState({deleteModal:true})}> Reset</button> <br/><br/>
                                 
                        </div>
                        {
                            this.state.pilihan.length?
                            this.renderHargadanQuantity()
                            :
                            null
                        }
                    </center>
                    <div className="d-flex justify-content-center mt-4 mb-5 pb-4">
                        <div>
                            {this.state.loading?null:this.renderseat()} 
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div>
                404 not found
            </div>
        )
    }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        //mengambil ID
        UserId:state.Auth.id

    }
}
export default connect(MapstateToprops) (Belitiket);
































































































