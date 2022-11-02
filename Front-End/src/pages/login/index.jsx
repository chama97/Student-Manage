import { Component, Fragment } from "react";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@mui/material/Grid';
import LoginService from "../../services/LoginService";
import { Link } from "react-router-dom";
import localStorageService from "../../services/StorageService";


class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: "",
                password: ""
            },

            data: [],  
        }
        this.submitUser = this.submitUser.bind(this);
    }


    submitUser= async () =>{
        let formData = this.state.formData;
        let res = await LoginService.postLogin(formData);

        if (res.status === 200) {
            localStorageService.setItem("token", res.data);
            window.location.href = "./user"
        } else {
            console.log("Invalid Username or password")
        }
    }


    render(){
        const { classes } = this.props;
        return(
            <Fragment>
                <div className={classes.container}>
                    <div className={classes.containerLeft}>
                        <div>
                            <span className={classes.txtfb}>Student<br/> Management<br/> </span>
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
                                    <Grid item lg={12} md={12} sm={12} xm={12}  style={{ marginTop:'20px'}} >
                                        <TextValidator
                                            id="outlined-basic"
                                            label="User Name"
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
                                    <Grid item lg={12} md={12} sm={12} xm={12} >
                                        <button className={classes.btnLogin}
                                            variant="contained"
                                            label="Log In"
                                            type="submit"
                                        > Log In
                                        </button>
                                    </Grid>
                                    
                                    <Grid item lg={12} md={12} sm={12} xm={12} style={{display:'flex', justifyContent:'center'}} >
                                        <hr style={{width:'100%'}}/> 
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xm={12} style={{display:'flex', justifyContent:'center'}} >
                                        <Link to="/sign" className={classes.btnSign}> Create New Account </Link> 
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default  withStyles(styleSheet)(Login) 