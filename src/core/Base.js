import React, { Children } from 'react'
import Menu from './Menu'

const Base = ({
    title="My Title",
    description="My Description",
    className="bg-dark text-white p-4",
    children
}) => {
    return (
        <div className="bg-dark d-flex flex-column" style={{minHeight: "100vh"}}>
            <Menu/>
            <div className="container-fluid p-0">
                <div className="bg-dark text-white text-center p-4">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>
                    {children}
                </div>
            </div>
            <footer className="footer bg-warning mt-auto shadow-lg" style={{position: "relative", bottom: '0', width: "100%"}}>
                <div className="container-fluid text-dark text-center py-3">
                    <h5>If you got any questions, reach out to me at <a className="text-dark" target="_blank" href="https://www.linkedin.com/in/udz/">LinkedIn</a></h5>
                    <button className="btn btn-dark rounded-pill btn-sm px-3">
                        Contact Us <small className="ms-1"><i className="fas fa-external-link-alt"></i></small>
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default Base