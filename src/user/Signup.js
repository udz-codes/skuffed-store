import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Base from "../core/Base"
import {signup} from "../auth/helper/index"

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {name, email, password, error, success} = values;

    const handleChange = field => (event) => {
        setValues({...values, error: false, [field]: event.target.value})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        setValues({...values, error:false})
        
        signup({
            name, email, password
        }).then(res => {
            console.log("Data", res)

            if(res.email === email) {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            } else {
                var e = ""

                if(res.name) {
                    if(res.name[0] === "This field may not be blank.") {
                        e = "Name field must not be blank"
                    } else {
                        e = res.name[0]
                    }
                } else if (res.email) {
                    if(res.email[0] === "This field may not be blank.") {
                        e = "Email field must not be blank"
                    } else {
                        e = res.email[0]
                    }
                } else if (res.password) {
                    if(res.password[0] === "This field may not be blank.") {
                        e = "Password field must not be blank"
                    } else {
                        e = res.password[0]
                    }
                }

                setValues({
                    ...values,
                    error: e,
                    success: false
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const signUpForm = () => {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="col-10 col-md-4 text-left text-left">
                    {   
                        success ?
                        <p className="text-success text-center">New account created successfully. Please <Link to="/signin">login</Link> now.</p>
                        : <p className="text-danger">{error}</p>
                    }
                    <form onSubmit={(event) => onSubmitHandler(event)}>
                        <div className="form-group mb-2">
                            <label className="text-light mb-1">Name</label>
                            <input

                                type="text"
                                className="form-control"
                                value={name}
                                onChange={handleChange("name")}
                                required
                                autoComplete="on"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="text-light mb-1">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={handleChange("email")}
                                required
                                autoComplete="on"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="text-light mb-1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password} minLength="8"
                                onChange={handleChange("password")}
                                required
                                autoComplete="on"
                            />
                        </div>
                        <input type="submit" className="form-control btn btn-warning mt-2" value="Create Account"/>
                    </form>
                </div>
                <small className="fw-bold mt-3">Already have an account? <Link to="/signin" className="text-warning">Login</Link></small>
            </div>
        );
    }

    return (
        <Base title="Sign Up Page"  description="Signup page for skuffed store user">
            {
                signUpForm()
            }
            {/* <p className="text-muted text-center flex-wrap">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default Signup;
