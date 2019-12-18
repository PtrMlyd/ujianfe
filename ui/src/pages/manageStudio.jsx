import React, { Component } from 'react';
import Axios from "axios";
import { APIURL } from '../support/ApiUrl';
import {Table,TableBody,TableHead,TableCell,TableRow} from '@material-ui/core'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Fade from 'react-reveal/Fade'
import {connect} from 'react-redux'
import {Route,Link,Switch} from 'react-router-dom'

class manageStudio extends Component {
    state = { 
        dataStudio:[],
        indexEdit:0,
        indexDelete:0,
        modalAdd:false,
        modalEdit:false,
        ModalDelete:false
    }

    onSaveDataClick=()=>{
        console.log('ini click add new data')
        
        var iniref=this.refs
        var nama=iniref.namaStudio.value
        var jumlahKursi=iniref.jumlah.value
        var data={
            nama,
            jumlahKursi
        }
        Axios.post(`${APIURL}studios/`,data)
        .then(()=>{
            Axios.get(`${APIURL}studios/`)
            .then((res1)=>{
                console.log("ini masuk add")
                this.setState({dataStudio:res1.data,modalAdd:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onUpdateDataClick=()=>{

        var id=this.state.dataStudio[this.state.indexEdit].id

        var iniref=this.refs
        var nama=iniref.editNamaStudio.value
        var jumlahKursi=parseInt(iniref.editJumlah.value)
        var data={
            nama,
            jumlahKursi
        }
        console.log(id)
        Axios.put(`${APIURL}studios/${id}`,data)
        .then(()=>{
            Axios.get(`${APIURL}studios/`)
            .then((res)=>{
                this.setState({dataStudio:res.data,modalEdit:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onDeleteDataClick=()=>{
        var id=this.state.dataStudio[this.state.indexDelete].id
        Axios.delete(`${APIURL}studios/${id}`)
        .then((res)=>{
            Axios.get(`${APIURL}studios/`)
            .then((res1)=>{
                this.setState({dataStudio:res1.data,ModalDelete:false})
            })
            .catch((err1)=>{
                console.log(err1)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentDidMount() {
        Axios.get(`${APIURL}studios`)
        .then((res)=>{
            this.setState({
                dataStudio:res.data
            }) 
            console.log(res.data)
        })
    }
    
    renderStudio=()=>{
        return this.state.dataStudio.map((val,index)=>{
            return(
                <TableRow>
                    <TableCell style={{width:'50px', paddingLeft:"250px", textAlign:"center"}}>{index+1}</TableCell>
                    <TableCell style={{width:'200px', textAlign:"center"}}>{val.nama}</TableCell>
                    <TableCell style={{ textAlign:"center"}}>{val.jumlahKursi}</TableCell>
                    <TableCell style={{textAlign:"center"}}>
                        <button onClick={()=>this.setState({modalEdit:true, indexEdit:index})} className="btn btn-outline-primary mr-2" > Edit </button>
                        <button onClick={()=>this.setState({ModalDelete:true})} className="btn btn-outline-danger" > Delete </button>
                    </TableCell> 
                </TableRow>
            )
        })
    }

    render() { 
        const {dataStudio,indexEdit}=this.state
        const {length}=dataStudio
        if(this.props.userRole==="1"){
            if(length===0){
                return (
                    <div> 
                        Studio is Empty, You Must Add New Data  
                        <Modal isOpen={this.state.modalAdd} toggle={()=>this.setState({modalAdd:false})}>
                            <ModalHeader>
                                Add New Studio
                            </ModalHeader>
                            <ModalBody>
                                <input type="text" ref='namaStudio'  placeholder='Nama Studio' className='form-control mt-2'/>
                                <input type="number" ref='jumlah' placeholder='Jumlah Kursi' className='form-control mt-2'/>
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={this.onSaveDataClick} className="btn btn-outline-success">Save</button>
                                <button onClick={()=>this.setState({modalAdd:false})} className="btn btn-outline-danger">Cancel</button>
                            </ModalFooter>
                        </Modal>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colspan="4" style={{textAlign:"right"}}> <button onClick={()=>this.setState({modalAdd:true})} className="btn btn-outline-success" > Add New Studio </button></TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </div>  
                )
            }

            return ( 
                <div>
                 {/* ========================ADD============================= */}
                    <Modal isOpen={this.state.modalAdd} toggle={()=>this.setState({modalAdd:false})}>
                        <ModalHeader>
                            Add New Studio
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" ref='namaStudio'  placeholder='Nama Studio' className='form-control mt-2'/>
                            <input type="number" ref='jumlah' placeholder='Jumlah Kursi' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={this.onSaveDataClick} className="btn btn-outline-success">Save</button>
                            <button onClick={()=>this.setState({modalAdd:false})} className="btn btn-outline-danger">Cancel</button>
                        </ModalFooter>
                    </Modal>
                     {/* ========================EDIT============================ */}
                    <Modal isOpen={this.state.modalEdit} toggle={()=>this.setState({modalEdit:false})}>
                        <ModalHeader>
                            Edit Studio
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" defaultValue={dataStudio[indexEdit].nama} ref='editNamaStudio'  placeholder='Nama Studio' className='form-control mt-2'/>
                            <input type="number" defaultValue={dataStudio[indexEdit].jumlahKursi} ref='editJumlah' placeholder='Jumlah Kursi' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={this.onUpdateDataClick} className="btn btn-outline-success">Save</button>
                            <button onClick={()=>this.setState({modalEdit:false})} className="btn btn-outline-danger">Cancel</button>
                        </ModalFooter>
                    </Modal>
                    {/* ========================DELETE============================= */}
                    <Modal isOpen={this.state.ModalDelete} toggle={()=>this.setState({ModalDelete:false})}>
                        <ModalHeader>
                            Delete Studios
                        </ModalHeader>
                        <ModalBody>
                            Are You Sure Delete This Studio ?
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-danger' onClick={this.onDeleteDataClick}>
                                YES
                            </button>
                            <button className="btn btn-primary" onClick={()=>this.setState({ModalDelete:false})}>
                                NO
                            </button>
                        </ModalFooter>
                    </Modal>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colspan="4" style={{textAlign:"right"}}> <button onClick={()=>this.setState({modalAdd:true})} className="btn btn-outline-success" > Add New Studio </button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{width:'50px', paddingLeft:"250px", textAlign:"center"}} > No </TableCell>
                                <TableCell style={{width:'200px', textAlign:"center"}}> Name </TableCell>
                                <TableCell style={{ textAlign:"center"}}> Total Seat </TableCell>
                                <TableCell style={{ textAlign:"center"}}> Action </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderStudio()}
                        </TableBody>
                    </Table>
                </div>
            );
        }else{
            return(
                <div> 
                    404 Not Found, or You Must Login as Admin 
                </div>
            )
        }
    }
}
 

const mapStateToProps=(state)=>{
    return{
        userRole:state.Auth.role
    }
}
 
export default connect (mapStateToProps)(manageStudio);