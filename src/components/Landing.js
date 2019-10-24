import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../redux/reducer';

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    componentDidMount() {

    }

    handleLogin = () => {
        axios.post('/auth/login', {email: this.state.email, password: this.state.password}).then(res => {
            //redux action here
            this.props.updateUser(res.data)
            this.props.history.push('/account') //clears inputs to be empty strings
            this.setState({
                email: '',
                password: ''
            })
        })
        .catch(err => console.log(err))
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
            //'e' makes it so we can have one function that handles all inputs (name is a built in word that references 'email' + 'password' / 'value' references their values)
        })
    }
    render() {
        console.log(this.props)
        return(
            <div>
                <h1>Login Here</h1>
                <input 
                    value={this.state.email}
                    // whatever is typed here will set to state
                    name='email' 
                    onChange={(e) => this.handleInput(e)} />
                <input 
                    password={this.state.password}
                    name='password'
                    onChange={(e) => this.handleInput(e)}/>
                <button onClick={this.handleLogin}>Login</button>
                <Link to='/register'>Register</Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState;
    return {
        user
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);