import {Component, Fragment} from "react";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import Appbar from "../../component/Appbar";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SnackBar from "../../component/SnackBar";
import EditIcon from '@mui/icons-material/Edit';
import UserService from "../../services/UserService";
// import { Link } from "react-router-dom";


class User extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                _id: "",
                name: {
                    firstname: "",
                    lastname: ""
                },
                gender: "",
                dateOfBirth : "",
                email: "",
                password: "",
                contact: ""
            },

            data: [],  
            userData:[],
            genderData: ['Male','Female'],

            alert: false,
            message: '',
            severity: '', 
        }
    }

    clearFields = () => {
        this.setState({
            formData: {
                _id: "",
                name: {
                    firstname: "",
                    lastname: ""
                },
                gender: "",
                dateOfBirth : "",
                email: "",
                password: "",
                contact: ""
            }
        });
    };

    loadData = async () => {
        let res = await UserService.fetchUser();
        if (res.status === 200) {
            this.setState({
                data: res.data,
            });
        } else {
            console.log("fetching error: " + res)
        }
    };

    getUserById = async (_id) => {
        let res = await UserService.getUserById(_id);
        if(res.status === 200) {
            this.setState({
               _id: _id._id,
                name: {
                    firstname: _id.firstname,
                    lastname: _id.lastname
                },
                gender: _id.gender,
                dateOfBirth : _id.dateOfBirth,
                email: _id.email,
                password: _id.password,
                contact: _id.contact
            });
        } else {
           this.setState({
               alert: true,
               message: res.data.message,
               severity: 'error'
           });
        }
   };


    deleteUser = async (_id) => {
        // let params = {
        //     _id: _id
        // }
         let res = await UserService.deleteUser(_id);
         if(res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success'
            });
            this.loadData();
         } else {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'error'
            });
         }
    };

    updateUser = (data) => {
         console.log(data)

         this.setState({ 
            formData: {
                _id: data._id,
                name: {
                    firstname: data.name.firstname,
                    lastname: data.name.lastname
                },
                gender: data.gender,
                dateOfBirth : data.dateOfBirth,
                email: data.email,
                password: data.password,
                contact: data.contact
            }  
        });
    };

    submitUser = async () => {
        let formData = this.state.formData;

        let res = await UserService.putUser(formData);
        if(res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success',
                });
                this.clearFields();
                this.loadData();
        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        } 
    };

    componentDidMount() {
        this.loadData();
    }

   
    render(){
        let { classes } = this.props

        return(
            <Fragment >
                <div><Appbar /></div>
                <div className={classes.container}>
                    <div className={classes.menuSide}>
                        <div className={classes.profileBar}>
                            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ padding:'20px'}} >
                                <Grid item lg={8} md={8} sm={12} xm={12}  >
                                    <TextField
                                        id="outlined-basic"
                                        label="Enter User Name"
                                        variant="outlined"
                                        value={this.state.formData._id}
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            let formData = this.state.formData
                                            formData._id = e.target.value
                                            this.setState({ formData })
                                        }}
                                        style={{ width: '100%' }}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xm={12} style={{marginTop:'3px'}}  >
                                    <Button variant="contained"  endIcon={<SearchOutlinedIcon />} style={{height:'50px'}}
                                        onClick={() => {
                                            this.getUserById(this.state._id)
                                        }}>
                                            Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.profileDetail}>
                            <ValidatorForm
                                ref="form"
                                onSubmit={this.submitUser}
                                onError={errors => console.log(errors)}>
                                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ padding:'20px'}} >
                                    <Grid item lg={12} md={12} sm={12} xm={12}  >
                                        <TextValidator
                                            id="outlined-basic"
                                            label="User ID"
                                            variant="outlined"
                                            value={this.state.formData._id}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                let formData = this.state.formData
                                                formData._id = e.target.value
                                                this.setState({ formData })
                                            }}
                                            style={{ width: '100%' }}
                                            validators={['required']}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xm={12}  >
                                        <TextValidator
                                            id="outlined-basic"
                                            label="First Name"
                                            variant="outlined"
                                            value={this.state.formData.name.firstname}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                let formData = this.state.formData
                                                formData.name.firstname = e.target.value
                                                this.setState({ formData })
                                            }}
                                            style={{ width: '100%' }}
                                            validators={['required','matchRegexp:^[A-z]{1,20}$']}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xm={12} >
                                        <TextValidator
                                            id="outlined-basic"
                                            label="Last Name"
                                            variant="outlined"
                                            value={this.state.formData.name.lastname}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                let formData = this.state.formData
                                                formData.name.lastname = e.target.value
                                                this.setState({ formData })
                                            }}
                                            style={{ width: '100%' }}
                                            validators={['required','matchRegexp:^[A-z]{1,20}$']}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xm={12}>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={this.state.genderData}
                                            value={this.state.formData.gender}
                                            onChange={(event, value) => {
                                                let formData = this.state.formData
                                                formData.gender = value
                                                this.setState({ formData })
                                            }}
                                            style={{ width: '100%'}}
                                            validators={['required']}
                                            renderInput={(params) => <TextField {...params} label="Gender" />}
                                        /> 
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xm={12} >
                                        <TextValidator
                                            id="outlined-basic"
                                            // label="Date Of Birth"
                                            variant="outlined"
                                            type="date"
                                            value={this.state.formData.dateOfBirth}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                let formData = this.state.formData
                                                formData.dateOfBirth = e.target.value
                                                this.setState({ formData })
                                            }}
                                            style={{ width: '100%' }}
                                            validators={['required']}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xm={12}>
                                        <TextValidator
                                            id="outlined-basic"
                                            label="Email"
                                            variant="outlined"
                                            value={this.state.formData.email}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                let formData = this.state.formData
                                                formData.email = e.target.value
                                                this.setState({ formData })
                                            }}
                                            style={{ width: '100%' }}
                                            validators={['required','isEmail']}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xm={12}>
                                        <TextValidator
                                            id="outlined-basic"
                                            label="Password"
                                            variant="outlined"
                                            value={this.state.formData.password}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                let formData = this.state.formData
                                                formData.password = e.target.value
                                                this.setState({ formData })
                                            }}
                                            style={{ width: '100%' }}
                                            validators={['required','isString']}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xm={12}>
                                        <TextValidator
                                            id="outlined-basic"
                                            label="Contact Number"
                                            variant="outlined"
                                            value={this.state.formData.contact}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                let formData = this.state.formData
                                                formData.contact = e.target.value
                                                this.setState({ formData })
                                            }}
                                            style={{ width: '100%' }}
                                            validators={['required','isString']}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xm={12} >
                                    <button className={classes.btnUpdate}
                                            variant="contained"
                                            label="Update"
                                            type="submit"
                                           
                                        > Update
                                        </button>
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={6} xm={12} >
                                        <button className={classes.btnUpdate} style={{backgroundColor:'red'}}
                                            variant="contained"
                                            label="Clear"
                                            type="clear"
                                            onClick={() => {
                                                this.clearFields()
                                            }}
                                        > Clear
                                        </button>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                            
                        </div>
                    </div>
                    <div className={classes.tableSide}>
                        <div className={classes.tableBox}>
                            <Grid container style={{ height: '100%', width: '100%', padding: '10px' }}>
                                <TableContainer component={Paper} sx={{maxHeight:'100%',  maxWidth: '100%' }}>
                                    <Table aria-label="customer table">
                                        <TableHead>
                                            <TableRow style={{backgroundImage: 'linear-gradient(to right top, #8655a1, #815fb8, #746ad0, #5b77e8, #1884ff)'}}>
                                            <TableCell align="left" style={{color:'white'}}> ID</TableCell>
                                                <TableCell align="left" style={{color:'white'}}> First Name</TableCell>
                                                <TableCell align="left" style={{color:'white'}}> Last Name</TableCell>
                                                <TableCell align="left" style={{color:'white'}}> Gender</TableCell>
                                                <TableCell align="left" style={{color:'white'}}> Date of Birth</TableCell>
                                                <TableCell align="left" style={{color:'white'}}> Email</TableCell>
                                                <TableCell align="left" style={{color:'white'}}> Password</TableCell>
                                                <TableCell align="left" style={{color:'white'}}> Mobile</TableCell>
                                                <TableCell align="left" style={{color:'white'}}> Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    <TableBody>
                                    {
                                        this.state.data.map((row) => (
                                            <TableRow>
                                                <TableCell align="left">{row._id}</TableCell>
                                                <TableCell align="left">{row.name.firstname}</TableCell>
                                                <TableCell align="left">{row.name.lastname}</TableCell>
                                                <TableCell align="left">{row.gender}</TableCell>
                                                <TableCell align="left">{row.dateOfBirth}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.password}</TableCell>
                                                <TableCell align="left">{row.contact}</TableCell>
                                            
                                                <TableCell align="left">
                                                    <Tooltip title="Edit">
                                                        <IconButton 
                                                            onClick={() => {
                                                                console.log("edit icon clicked!")
                                                                this.updateUser(row);
                                                            }}
                                                        >
                                                        <EditIcon color="primary" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            onClick={() => {
                                                                this.deleteUser(row._id)
                                                            }}
                                                        >
                                                        <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    </TableBody>
                                    </Table>
                                </TableContainer> 
                            </Grid>
                        </div>   
                    </div>
                    <SnackBar
                        open={this.state.alert}
                        onClose={() => {
                            this.setState({ alert: false })
                        }}
                        message={this.state.message}
                        autoHideDuration={3000}
                        severity={this.state.severity}
                        variant="filled"
                    />
                </div>

            </Fragment>  
        )
    }
}

export default withStyles(styleSheet)(User) 
