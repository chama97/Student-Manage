import { Component, Fragment } from "react";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SnackBar from "../../component/SnackBar";
import UserService from "../../services/UserService";
import { Link } from "react-router-dom";


class Sign extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formData: {
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
            genderData: [
                { label: 'Male'},
                { label: 'Female'}
            ],

            alert: false,
            message: '',
            severity: '', 
        }
    }


    clearFields = () => {
        this.setState({
            formData: {
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
  
    submitUser = async () => {
        let formData = this.state.formData;
        let res = await UserService.postUser(formData);
  
        console.log(res)
    
        if (res.status === 200) {
            this.setState({
                alert: true,
                message: 'done',
                severity: 'success'
            });
            this.clearFields();
        } else {
            this.setState({
                alert: true,
                message: 'error try again',
                severity: 'error'
            });
        }
    }


    render(){
        const { classes } = this.props;
        return(
            <Fragment>
                <div className={classes.container}>
                    <div className={classes.containerLeft}>
                        <div>
                            <span className={classes.txtfb}>facebook <br/> </span>
                            <span className={classes.txttext}>Facebook helps you connect and share <br/>
                                with the people in your life.
                            </span>
                        </div>
                    </div>
                    <div className={classes.containerRight}>
                        <div className={classes.logincover}>
                            <ValidatorForm
                                ref="form"
                                onSubmit={this.submitUser}
                                onError={errors => console.log(errors)}
                                className={classes.form__container}>
                                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ padding:'20px'}} >
                                <Grid item lg={6} md={6} sm={12} xm={12}  style={{ marginTop:'20px'}} >
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
                                    <Grid item lg={6} md={6} sm={12} xm={12} style={{ marginTop:'20px'}} >
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
                                    <Grid item lg={12} md={12} sm={12} xm={12}>
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
                                    <Grid item lg={12} md={12} sm={12} xm={12} >
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
                                    <Grid item lg={12} md={12} sm={12} xm={12} >
                                        <button className={classes.btnLogin}
                                            variant="contained"
                                            label="Log In"
                                            type="submit"
                                        > Sign Up
                                        </button>
                                    </Grid>
                                   
                                    <Grid item lg={12} md={12} sm={12} xm={12} style={{display:'flex', justifyContent:'center'}} >
                                        <Link to="/" className={classes.btnSign}> Go to login Page ?</Link> 
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
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

export default withStyles(styleSheet)(Sign)