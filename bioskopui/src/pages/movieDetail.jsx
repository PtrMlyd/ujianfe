import React, { Component } from 'react';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
// import Belitiket from './belitiket'
import {Modal,ModalBody,ModalFooter} from 'reactstrap'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class MovieDetail extends Component {
    state = {
        datadetailfilm:{},
        traileropen:false,
        notloginyet:false,
        kelogin:false,
        belitiketok:false
    }
    componentDidMount(){
        Axios.get(`${APIURL}movies/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({datadetailfilm:res.data})
        }).catch(err=>{
            console.log(err)
        })
    }

    onBeliTiketClick=()=>{
        console.log('ini di click')
        if(this.props.AuthLog){
            this.setState({belitiketok:true})
        }else{
            this.setState({notloginyet:true})
        }
    }


    render() {
        if(this.state.kelogin){
            return <Redirect to={'/login'}/>
        }
        if(this.state.belitiketok){
            return <Redirect to={{pathname:'/belitiket',state:this.state.datadetailfilm}}/>
        }
        return (
            <div>
                <Modal isOpen={this.state.traileropen} size='lg' toggle={()=>this.setState({traileropen:false})}
                   contentClassName=' trailer' >
                    <ModalBody className='p-0 bg-transparent'>
                        <iframe width="100%" title={this.state.datadetailfilm.title} height="100%" src={this.state.datadetailfilm.trailer} 
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.notloginyet} centered>
                    <ModalBody>
                        <h5>You need Login First</h5>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-outline-danger' onClick={()=>this.setState({notloginyet:false})}>Cancel</button>
                        <button className='btn btn-outline-primary' onClick={()=>this.setState({kelogin:true})}>Login</button>
                    </ModalFooter>
                </Modal>
                <div className="row p-3 mx-3 my-4">
                    <div className="col-md-4">
                        <img src={this.state.datadetailfilm.image} height='400' alt="film"/>
                        <div className='mt-3' style={{fontSize:'30px'}}>
                            {this.state.datadetailfilm.title}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className='mt-1'>
                            Title <span className='ml-4'>:</span>  
                        </div>
                        <div className='mt-1'>
                            Sinopsis <span className='ml-2'>:</span>  
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='mt-1'>
                            {this.state.datadetailfilm.title}
                        </div>
                        <div className='mt-1'>
                            {this.state.datadetailfilm.sinopsis}
                        </div>
                        <div className='mt-3'>
                            <button className='mr-3 btn btn-primary' onClick={this.onBeliTiketClick} >Beli tiket</button>
                            <button className=' btn btn-outline-warning' onClick={()=>this.setState({traileropen:true})}>Trailer</button>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}
const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login
    }
}
export default connect(MapstateToprops)(MovieDetail);