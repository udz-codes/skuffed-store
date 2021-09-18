import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    })

    const {email, password, error, success, loading, didRedirect} = values;


    const handleChange = field => (event) => {
        setValues({...values, error: false, [field]: event.target.value})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        setValues({...values, error:false, loading: true})

        signin({
            email, password
        }).then(res => {
            // console.log("Data", res)

            if(res.token) {
                authenticate(res, () => {
                    setValues({
                        ...values,
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                        loading: false,
                        didRedirect: true
                    })
                });
            } else {
                
                var e = ""

                if(res.error) {
                    e = res.error
                }

                setValues({
                    ...values,
                    error: e,
                    success: false,
                    loading: false
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const triggerRedirect = () => {
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <p className="text-warning text-center">Loading...</p>
            )
        )
    }

    const signInForm = () => {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="col-10 col-md-4 text-left text-left">
                    {   
                        error.length === 0 ? <p></p> : <p className="text-danger">{error}</p>
                    }
                    <form onSubmit={(event) => onSubmitHandler(event)}>
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
                        <input type="submit" className="form-control btn btn-warning mt-2" value="Login"/>
                    </form>
                </div>
                <small className="fw-bold mt-3">Don't have an account? <Link to="/signup" className="text-warning">Create Account</Link></small>
            </div>
        );
    }

    return (
        <Base title="Login" description="Login to skuffed store to buy awesome t-shirts">
            {loadingMessage()}
            {signInForm()}
            {triggerRedirect()}
        </Base>
    )
}

export default Signin;
