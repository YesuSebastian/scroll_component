import React from 'react';
import {ReactComponent as Logo} from '../../assets/user.svg'
import './login.css';
class Login extends React.Component{
    state={
        username: '',
        pwd:''
    }

    handleChange = (e) =>{
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        console.log(this.state.username)
        if(this.state.username=="foo" && this.state.pwd=="bar"){
            this.props.isLogin(true)
        }else{
            alert('invalid credentials')
        }
       
    }
    render(){
        return(
            <div className='div-login'>
                <div className='div-login-logo'>
                    <Logo/>
                </div>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <input type='text' name='username' placeholder='username...' required onChange={this.handleChange}/>
                        <input type='password' name='pwd' placeholder='password...' required onChange={this.handleChange}/>
                        <button onSubmit={this.handleSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;