import React from 'react';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const { login } = require('../../services/services');

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e, param) => {
        this.setState({ [param]: e.target.value });
    }

    loginUser = () => {
        const req = {
            email: this.state.email,
            password: this.state.password
        };
        return login(req)
            .then((result) => {
                if (result && result.data.success) {
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('token', result.data.data.token);
                    this.props.history.push('/dashboard');
                } else {
                    alert(result.data.message || 'Some error occured');
                }
            }).catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className={"container login-body"}>
                <Paper elevation={2} style={{ padding: "1em", display: "flex", flexDirection: "column", width: "40%" }}>
                    <TextField id="outlined-basic" value={this.state.email} onChange={($event) => this.handleChange($event, 'email')} label="Email" variant="outlined" style={{ margin: "0 0 0.5em" }} />
                    <TextField type="password" id="outlined-basic" value={this.state.password} onChange={($event) => this.handleChange($event, 'password')} label="Password" variant="outlined" style={{ margin: "0.5em 0 0" }} />
                    <Button variant="contained" onClick={this.loginUser} color="primary" style={{ margin: "1em 0 0" }}>
                        Login
                    </Button>
                    <span style={{ textAlign: "center", fontSize: "12px" }}>
                        <p>Need an account? Sign up!</p>
                    </span>
                </Paper>
            </div>
        )
    }
}
export default Login