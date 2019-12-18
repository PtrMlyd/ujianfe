import Axios from "axios"
import { APIURL } from "../../support/ApiUrl"

export const LoginSuccessAction=(datauser)=>{
    return{
        type:'LOGIN_SUCCESS',
        payload:datauser
    }
}
// login menggunakan redux-thunk
export const loginThunk=(username,password)=>{
    return(dispatch)=>{
        dispatch({type:'LOGIN_LOADING'})
        Axios.get(`${APIURL}users?username=${username}&password=${password}`)
        .then((res)=>{
            if(res.data.length){
                localStorage.setItem(`dino`,res.data[0].id)
                dispatch(LoginSuccessAction(res.data[0]))
            }else{
                dispatch({type:'LOGIN_ERROR',payload:'Data tidak ditemukan atau Password Anda Salah'})
            }
        }).catch((err)=>{
            console.log(err)
            dispatch({type:'LOGIN_ERROR',payload:'SERVER ERROR'})
        })
    }
}

// export const registerThunk=(username,password, conpassword)=>{
//     return(dispatch)=>{
//         dispatch({type:'REGISTER_LOADING'})
//         Axios.get(`${APIURL}users?username=${username}`)
//         .then((res)=>{
//             if(res.data.length){
                
//                 dispatch(registerSuccessAction(res.data[0]))
//             }else{
//                 dispatch({type:'REGISTER_ERROR',payload:'Username telah digunakan'})
//             }
//         }).catch((err)=>{
//             console.log(err)
//             dispatch({type:'REGISTER_ERROR',payload:'SERVER ERROR'})
//         })
//     }
// }

export const logoutSuccessAction=()=>{
    return{
        type:'LOGOUT_SUCCESS'
        // localStorage.removeItem('dino') // untuk hapus semua item yang ada di local storage
        // window.location.reload()
    }
}

export const LOGIN_ERROR=()=>{
    return(dispatch)=>{
        dispatch({type:'LOGIN_ERROR',payload:''})
    }
}
















// export const onRegisterSuccess=()=>{
//     return{
//         type:'REGISTER_SUCCESS',
        
//     }
// }