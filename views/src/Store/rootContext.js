import React,{Component} from "react"
import axios from "axios"
const RootContext = React.createContext();


export class Provider extends Component{
    constructor(props){
        super(props)
        this.getDataServer()
        .then(data=>{
            this.setState({
                user: data.user,
                isLogined: data.isLogined
            })
        })
        .catch(e=>console.log(e.toString()))
    }
    state = {
        user: {},
        isLogined: false
    }
    isAuthenticated = (fb)=>{
        this.getDataServer().then(data=>{
            fb(data.isLogined);
        })
    }
    getDataServer(){
        return new Promise((resolve,reject)=>{
            axios({
                method: "POST",
                url: "/user/passport"
            })
            .then(result=>{
                resolve(result.data)
            })
            .catch(e=>reject(e.toString()))
        }) 
    }
    render(){
        return (
            <RootContext.Provider value={{
                state: this.state,
                action: {
                    isAuthenticated : this.isAuthenticated
                }
            }}>
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export const Consumer = RootContext.Consumer