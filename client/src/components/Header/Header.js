import React from 'react';
import Logout from "../Logout/Logout";
import { withRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { updateUserPassword } from "../../services/services";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            currentPassword: '',
            newPassword: ''
        }
    }

    componentDidMount() {
        this.setState({ isLoggedIn: this.props.isLoggedIn });
    }

    clearData = () => {
        this.setState({
            isLoggedIn: false
        });
        this.props.logout();
        localStorage.clear();
    }

    handleChange = (e, param) => {
        this.setState({ [param]: e.target.value });
    }

    openChangePasswordDialog = () => {
        this.setState({ openModal: true });
    }

    handleClose = () => {
        this.setState({ openModal: false, currentPassword: '', newPassword: '' });
    };

    updatePassword = () => {
        const req = {
            newPassword: this.state.newPassword,
            currentPassword: this.state.currentPassword
        };
        updateUserPassword(req)
            .then((result) => {
                if (result && result.data.success) {
                    this.setState({ openModal: false, currentPassword: '', newPassword: '' });
                    alert('Password updated successfully');
                } else {
                    alert(result.data.message);
                }
            }).catch(err => { alert('Invalid password'); });
    }


    render() {
        return (
            <React.Fragment>
                <div className={"header-wrapper"}>
                    <p>Todo Application</p>
                    {this.props.isLoggedIn ?
                        <div className={"menu-options"}>
                            <div className={"menu-items"}>
                                <small style={{ cursor: "pointer" }} onClick={() => this.openChangePasswordDialog()}>Change Password</small>
                            </div>
                            <Logout clearStorage={() => this.clearData()}></Logout>
                        </div> : null}
                </div>
                <Dialog
                    open={this.state.openModal}
                    onClose={this.handleClose}
                    maxWidth={'sm'}
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Update Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <TextField inputProps={{
                                    type: "password",
                                    autoComplete: 'new-password'
                                }} id="outlined-basic" value={this.state.currentPassword} onChange={($event) => this.handleChange($event, 'currentPassword')} label="Current Password" variant="outlined" style={{ margin: "0.5em 0 0" }} />
                                <TextField inputProps={{
                                    type: "password",
                                    autoComplete: 'new-password'
                                }} id="outlined-basic" value={this.state.newPassword} onChange={($event) => this.handleChange($event, 'newPassword')} label="New Password" variant="outlined" style={{ margin: "0.5em 0 0" }} />
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button color="primary" onClick={() => this.updatePassword()}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}
export default withRouter(Header)