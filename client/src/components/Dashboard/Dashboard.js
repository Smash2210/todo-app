import React from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { listItems, addNewTask, deleteTask, updateTaskStatus, editTaskTitle } from "../../services/services";
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskTitle: '',
            result: [],
            openDialog: false,
            updateTitleText: '',
            currentTaskId: ''
        }
        if (!props.isLoggedIn) {
            this.props.history.push('/login');
        }
    }

    componentDidMount() {
        listItems().then((result) => {
            this.setState({ result: result.data.data });
        }).catch(err => {
            console.log(err);
        })
    }

    handleChange = (e, param) => {
        this.setState({ [param]: e.target.value });
    }

    handleClose = () => {
        this.setState({ openDialog: false, updateTitleText: '' });
    };

    addTask = () => {
        const title = this.state.taskTitle;
        addNewTask({ title })
            .then(result => {
                if (result && result.data.success) {
                    const tableData = this.state.result;
                    tableData.push({
                        id: result.data.data[0].id,
                        title,
                        status: 'active'
                    });
                    this.setState({ result: tableData });
                }
            }).catch(err => {
                console.log(err);
            })
    }

    removeTask = (id) => {
        deleteTask({ taskId: id })
            .then((result) => {
                if (result && result.data.success) {
                    const tableData = this.state.result;
                    tableData.splice(tableData.findIndex((e) => e.id === id), 1);
                    this.setState({ result: tableData });
                }
            }).catch(err => {
                console.log(err);
            })
    }

    updateStatus = (event, taskId) => {
        const status = event.target.checked ? 'active' : 'done';
        const req = { status, taskId };
        updateTaskStatus(req)
            .then((result) => {
                if (result && result.data.success) {
                    const tableData = this.state.result;
                    const index = tableData.findIndex((e) => e.id === taskId);
                    tableData[index].status = status;
                    this.setState({ result: tableData });
                }
            }).catch(err => {
                console.log(err);
            })
    }

    openModal = (id) => {
        this.setState({ openDialog: true, currentTaskId: id });
    }

    editTitle = () => {
        const req = {
            title: this.state.updateTitleText,
            taskId: this.state.currentTaskId
        };
        editTaskTitle(req)
            .then((result) => {
                if (result && result.data.success) {
                    const tableData = this.state.result;
                    const index = tableData.findIndex((e) => e.id === this.state.currentTaskId);
                    tableData[index].title = this.state.updateTitleText;
                    this.setState({ result: tableData });
                }
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.setState({ updateTitleText: '', currentTaskId: '', openDialog: false });
            })
    }

    updateTitleTextHandler = (e) => {
        this.setState({ updateTitleText: e.target.value })
    }

    render() {
        return <div className={"container"}>
            <Paper style={{ padding: "1em", display: "flex", flexDirection: "column", width: "100%", overflow: "auto" }}>
                <div className={"action-elements"}>
                    <TextField autoComplete='off' id="outlined-basic" value={this.state.taskTitle} onChange={($event) => this.handleChange($event, 'taskTitle')} label="Title" variant="outlined" style={{ width: "20%" }} />
                    <Button variant="outlined" onClick={() => { this.addTask() }} color="primary" style={{ margin: "0 1em 0", width: "10%" }}>
                        Add
                    </Button>
                </div>
                <div style={{ marginTop: "1em" }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow style={{ background: "#333" }}>
                                    <TableCell style={{ color: "#fff" }}>ID</TableCell>
                                    <TableCell style={{ color: "#fff" }}>Title</TableCell>
                                    <TableCell align="right" style={{ color: "#fff" }}>Status</TableCell>
                                    <TableCell align="right" style={{ width: "10%", color: "#fff" }}>Edit</TableCell>
                                    <TableCell align="right" style={{ width: "10%", color: "#fff" }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.result.map((row) =>
                                    (<TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell align="right"><Switch checked={row.status === 'active'} color="primary" onChange={($event) => { this.updateStatus($event, row.id) }} /></TableCell>
                                        <TableCell align="right" style={{ width: "10%", cursor: "pointer" }} onClick={() => this.openModal(row.id)}>Edit</TableCell>
                                        <TableCell onClick={() => this.removeTask(row.id)} align="right" style={{ width: "10%", color: "red", cursor: "pointer" }}>Delete</TableCell>
                                    </TableRow>)
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Paper>
            <Dialog
                open={this.state.openDialog}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Update Title</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <textarea value={this.state.updateTitleText} onChange={this.updateTitleTextHandler} rows='4' cols='60' autoFocus style={{ resize: "none" }}></textarea>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                </Button>
                    <Button onClick={() => this.editTitle()} color="primary">
                        Update
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}
export default Dashboard