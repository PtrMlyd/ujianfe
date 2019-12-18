import React, { Component } from 'react';
import Axios from 'axios'
import {Table,TableBody,TableHead,TableCell,TableRow} from '@material-ui/core'
import { APIURL } from '../support/ApiUrl';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Fade from 'react-reveal/Fade'
import {Route,Link,Switch} from 'react-router-dom'
import {connect} from 'react-redux'

class ManageAdmin extends Component {
    state = { 
        datafilm:[],
        dataStudio:[],
        readmoreselected:-1,
        modaladd:false,
        modaledit:false,
        modalDelete:false,
        indexedit:0,
        indexDelete:0,
        jadwal:[12,14,16,18,20,22]
    }

    componentDidMount(){
        Axios.get(`${APIURL}movies`)
        .then((res)=>{
            // console.log(res.data)
            Axios.get(`${APIURL}studios`)
            .then((res1)=>{
                this.setState({
                    datafilm:res.data,
                    dataStudio:res1.data
                })
            }).catch((err1)=>{
                console.log(err1)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onSaveAddDataClick=()=>{
        var jadwaltemplate=[12,14,16,18,20]
        var jadwal=[]
        for(var i=0;i<jadwaltemplate.length;i++){
            if(this.refs[`jadwal${i}`].checked){
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref=this.refs
        var title=iniref.title.value
        var image=iniref.image.value
        var sinopsis=iniref.sinopsis.value
        var sutradara=iniref.sutradara.value
        var genre=iniref.genre.value
        var durasi=iniref.durasi.value
        var trailer=iniref.trailer.value
        var studioId=iniref.studio.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            sinopsis,
            sutradara,
            genre,
            durasi,
            produksi,
            jadwal,
            trailer,
            studioId
        }
        Axios.post(`${APIURL}movies`,data)
        .then(()=>{
            Axios.get(`${APIURL}movies`)
            .then((res)=>{
                this.setState({datafilm:res.data,modaladd:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onUpdateDataclick=()=>{
        var jadwaltemplate=this.state.jadwal
        var jadwal=[]
        var id=this.state.datafilm[this.state.indexedit].id
        console.log(id)
        //untuk menyimpan jadwal yang telah di check pada button Edit
        for(var i=0;i<jadwaltemplate.length;i++){
            if(this.refs[`editjadwal${i}`].checked){
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref=this.refs
        var title=iniref.edittitle.value
        var image=iniref.editimage.value
        var sinopsis=iniref.editsinopsis.value
        var sutradara=iniref.editsutradara.value
        var genre=iniref.editgenre.value
        var durasi=iniref.editdurasi.value
        var trailer=iniref.edittrailer.value
        var studioId=iniref.editstudio.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            sinopsis,
            sutradara,
            genre,
            durasi,
            produksi,
            jadwal,
            trailer,
            studioId
        }
        console.log(id)
        Axios.put(`${APIURL}movies/${id}`,data)
        .then(()=>{
            Axios.get(`${APIURL}movies/`)
            .then((res)=>{
                this.setState({datafilm:res.data,modaledit:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onDeleteDataClick=()=>{
        var id=this.state.datafilm[this.state.indexDelete].id
        Axios.delete(`${APIURL}movies/${id}`)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${APIURL}movies/`)
            .then((res1)=>{
                console.log(res1)
                this.setState({datafilm:res1.data,modalDelete:false})
            }).catch((err1)=>{
                console.log(err1)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderEditCheckbox=(indexedit)=>{
        var indexarr=[]
        var datafilmedit=this.state.datafilm[indexedit].jadwal
        console.log(datafilmedit)
        // console.log(this.state.jadwal)
        // console.log(this.state.jadwal.indexOf(datafilmedit[1]))
        // datafilmedit.forEach((val)=>{
        //     indexarr.push(this.state.jadwal.indexOf(val))
        // })
        for(var i=0;i<datafilmedit.length;i++){
            for(var j=0;j<this.state.jadwal.length;j++){
                if(datafilmedit[i]===this.state.jadwal[j]){
                    indexarr.push(j)
                }
            }
        }
        var checkbox=this.state.jadwal
        var checkboxnew=[]
        checkbox.forEach((val)=>{
            checkboxnew.push({jam:val,tampiledit:false})
        })
        indexarr.forEach((val)=>{
            checkboxnew[val].tampiledit=true
        })
        return checkboxnew.map((val,index)=>{
                if(val.tampiledit){
                        return (
                            <div key={index}>
                                <input type="checkbox" defaultChecked ref={`editjadwal${index}`} value={val.jam}/> 
                                <span className='mr-2'>{val.jam}.00</span>
                            </div>
                        )
                }else{
                    return (
                        <div key={index}>
                            <input type="checkbox"  ref={`editjadwal${index}`} value={val.jam}/> 
                            <span className='mr-2'>{val.jam}.00</span>
                        </div> 
                    )
                }
        })
    }

    renderAddCheckbox=()=>{
        return this.state.jadwal.map((val,index)=>{
            return(
                <div key={index}>
                    <input type="checkbox" ref={`jadwal${index}`}/> 
                    <span className='mr-2'>{val}.00</span> 
                </div>
            )
        })
    }

    renderMovies=()=>{
        return this.state.datafilm.map((val,index)=>{
            return(
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell><img src={val.image} alt={'gambar'} height='200px'/></TableCell>
                    {   this.state.readmoreselected===index?
                            <TableCell style={{width:'300px'}}>
                                {val.sinopsis} 
                                <span style={{color:'red'}} onClick={()=>this.setState({readmoreselected:-1})}>
                                    Read less
                                </span>
                            </TableCell>
                        :
                        <TableCell style={{width:'300px'}}>
                            {val.sinopsis.split('').filter((val,index)=>index<=50)}
                            <span style={{color:'red'}} onClick={()=>this.setState({readmoreselected:index})}>
                                Read More
                            </span>
                        </TableCell>
                    }
                    <TableCell>{val.jadwal}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.durasi}</TableCell>
                    <TableCell>
                        <button className='btn btn-outline-primary mr-3' onClick={()=>this.setState({modaledit:true,indexedit:index})}>Edit</button>
                        <button className='btn btn-outline-danger' onClick={()=>this.setState({modalDelete:true,indexDelete:index})}>Delete</button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() {
        const {datafilm,indexedit}=this.state
        const {length}=datafilm
        if(this.props.userRole==="1"){
            if(length===0){
                return (
                    <div> 
                        Movie is Empty, You Must Add New Data 
                        <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
                            <ModalHeader>
                                Add New Film
                            </ModalHeader>
                            <ModalBody>
                                <input type="text" ref='title'  placeholder='title' className='form-control mt-2'/>
                                <input type="text" ref='image' placeholder='image'className='form-control mt-2'/>
                                <input type="text" ref='sinopsis'  placeholder='sinopsis' className='form-control mt-2 mb-2'/>
                                Jadwal:
                                <div className="d-flex">
                                    {this.renderAddCheckbox()}
                                </div>
                                <input type="text" ref='trailer' placeholder='trailer'className='form-control mt-2' />
                                <select ref='studio' className='form-control mt-2'>
                                {
                                    this.state.dataStudio.map((val)=>{
                                        return(
                                            <option value={val.id}>{val.nama}</option>    
                                        )
                                    })
                                }
                                </select> 
                                <input type="text"  ref='sutradara' placeholder='sutradara' className='form-control mt-2'/>
                                <input type="number"  ref='durasi' placeholder='durasi' className='form-control mt-2'/>
                                <input type="text" ref='genre' placeholder='genre' className='form-control mt-2'/>
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={this.onSaveAddDataClick}>Save</button>
                                <button onClick={()=>this.setState({modaladd:false})}>Cancel</button>
                            </ModalFooter>
                        </Modal>

                        <Table size='small' >
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan='10' style={{textAlign:"right"}}>
                                        <button className='btn btn-success' onClick={()=>this.setState({modaladd:true})}> Add Data</button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </div>  
                )
            }
            return (
                <div className='mx-3'>
                    <Modal isOpen={this.state.modaledit} toggle={()=>this.setState({modaledit:false})}>
                        <ModalHeader>
                            Edit Data {datafilm[indexedit].title}
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" defaultValue={datafilm[indexedit].title} ref='edittitle'  placeholder='title' className='form-control mt-2'/>
                            <input type="text" defaultValue={datafilm[indexedit].image} ref='editimage' placeholder='image'className='form-control mt-2'/>
                            <textarea rows='5' ref='editsinopsis' defaultValue={datafilm[indexedit].sinopsis} placeholder='sinopsis' className='form-control mt-2 mb-2'/>
                            Jadwal:
                            <div className="d-flex">
                                {this.renderEditCheckbox(indexedit)}
                            </div>
                            <input type="text" defaultValue={datafilm[indexedit].trailer} ref='edittrailer' placeholder='trailer'className='form-control mt-2' />
                            <select ref='editstudio' className='form-control mt-2'>
                            {
                                this.state.dataStudio.map((val)=>{
                                    return(
                                        <option value={val.id}>{val.nama}</option>    
                                    )
                                })
                            }   
                            </select> 
                            <input type="text" defaultValue={datafilm[indexedit].sutradara}  ref='editsutradara' placeholder='sutradara' className='form-control mt-2'/>
                            <input type="number" defaultValue={datafilm[indexedit].durasi}  ref='editdurasi' placeholder='durasi' className='form-control mt-2'/>
                            <input type="text" defaultValue={datafilm[indexedit].genre} ref='editgenre' placeholder='genre' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={this.onUpdateDataclick} >Save</button>
                            <button onClick={()=>this.setState({modaledit:false})}>Cancel</button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
                        <ModalHeader>
                            Add New Film
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" ref='title'  placeholder='title' className='form-control mt-2'/>
                            <input type="text" ref='image' placeholder='image'className='form-control mt-2'/>
                            <input type="text" ref='sinopsis'  placeholder='sinopsis' className='form-control mt-2 mb-2'/>
                            Jadwal:
                            <div className="d-flex">
                                {this.renderAddCheckbox()}
                            </div>
                            <input type="text" ref='trailer' placeholder='trailer'className='form-control mt-2' />
                            <select ref='studio' className='form-control mt-2'>
                            {
                                this.state.dataStudio.map((val)=>{
                                    return(
                                        <option value={val.id}>{val.nama}</option>    
                                    )
                                })
                            }
                            </select> 
                            <input type="text"  ref='sutradara' placeholder='sutradara' className='form-control mt-2'/>
                            <input type="number"  ref='durasi' placeholder='durasi' className='form-control mt-2'/>
                            <input type="text" ref='genre' placeholder='genre' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={this.onSaveAddDataClick}>Save</button>
                            <button onClick={()=>this.setState({modaladd:false})}>Cancel</button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalDelete} toggle={()=>this.setState({modalDelete:false})}>
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
                            <button className="btn btn-primary" onClick={()=>this.setState({modalDelete:false})}>
                                NO
                            </button>
                        </ModalFooter>
                    </Modal>
                    <Fade>
                        
                        <Table size='small' >
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan='10' style={{textAlign:"right"}}>
                                        <input className='mr-4 ' type="text" placeholder='Cari Film'/>
                                        <button className='btn btn-success' onClick={()=>this.setState({modaladd:true})}> Add Data</button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Judul</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Sinopsis</TableCell>
                                    <TableCell>Jadwal</TableCell>
                                    <TableCell>Sutradara</TableCell>
                                    <TableCell>Genre</TableCell>
                                    <TableCell>Durasi</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderMovies()}
                            </TableBody>
                        </Table>
                    </Fade>
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
 
export default connect (mapStateToProps)(ManageAdmin);