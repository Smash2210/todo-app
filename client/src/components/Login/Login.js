import React from 'react';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const { login, createAccount } = require('../../services/services');

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            openModal: false,
            newPassword: '',
            username: '',
            signupEmail: ''
        }
        if (props.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
    }

    handleChange = (e, param) => {
        this.setState({ [param]: e.target.value });
    }

    handleClose = () => {
        this.setState({ openModal: false, username: '', newPassword: '', signupEmail: '' });
    };

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
                    this.props.loggedIn();
                    this.props.history.push('/dashboard');
                } else {
                    alert(result.data.message || 'Some error occured');
                }
            }).catch(err => {
                console.log(err);
            });
    };

    openSignupModal = () => {
        this.setState({ openModal: true });
    }

    signup = () => {
        const req = {
            email: this.state.signupEmail,
            password: this.state.newPassword,
            username: this.state.username
        };
        createAccount(req)
            .then((result) => {
                if (result && result.data.success) {
                    alert(result.data.data.message || 'User created successfully! Login with your credentials');
                    this.setState({ openModal: false });
                }
            }).catch(err => {
                console.log(err);
            })
    }

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
                        <p>Need an account? <span onClick={() => this.openSignupModal()} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Sign up!</span></p>
                    </span>
                </Paper>
                <Dialog
                    open={this.state.openModal}
                    onClose={this.handleClose}
                    maxWidth={'sm'}
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Create Account</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <TextField id="outlined-basic" value={this.state.username} onChange={($event) => this.handleChange($event, 'username')} label="Username" variant="outlined" style={{ margin: "0 0 0.5em" }} />
                                <TextField id="outlined-basic" value={this.state.signupEmail} onChange={($event) => this.handleChange($event, 'signupEmail')} label="Email" variant="outlined" style={{ margin: "0 0 0.5em" }} />
                                <TextField type="password" id="outlined-basic" value={this.state.newPassword} onChange={($event) => this.handleChange($event, 'newPassword')} label="Password" variant="outlined" style={{ margin: "0.5em 0 0" }} />
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button color="primary" onClick={() => this.signup()}>
                            Sign up
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default Login