import React from 'react'
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import {logo} from "../img/image";


const Navbar = (props) => {

  return (
    <NavbarContainer className="header-bg">
        <div className="container header">
            <nav className="navbar navbar-expand-md navbar-light py-2">
                <Link className="navbar-brand" to="/">
                    <img className="img-fluid App-logo" src={logo} alt="logo" width="36px" height="36px" />
                    &nbsp; COVID - 19
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item mt-2 mx-3">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item mt-2 mx-3">
                            <a className="nav-link" href="/#stats">Stats</a>
                        </li>
                        <li className="nav-item mt-2 mx-3">
                            <a className="nav-link" href="/#transmission">Transmission</a>
                        </li>
                        <li className="nav-item mt-2 mx-3">
                            <a className="nav-link " href="/#symptoms">Symptoms</a>
                        </li>
                        <li className="nav-item mt-2 ms-3 me-5">
                            <a className="nav-link" href="/#prevention">Prevention</a>
                        </li>
                        <li className="nav-item mt-2 mx-3">
                            <a className="nav-link px-4 py-2" id="helpline" href="#contact">Helpline</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </NavbarContainer>
  )
}


const NavbarContainer = styled.header`
.header .nav-link {
    color: var(--text) !important;
    font-weight: 400;
}
.active {
    color: var(--primary) !important;
    padding-left: 0 !important;
    border-bottom: 4px solid var(--primary);
    width: 30%;
    border-radius: 3px;
}
.header .nav-link:hover {
    background-color: rgb(255, 94, 57, 0.2);
    width: max-content;
    padding-left: 8px !important;
    transition: all 0.5s ease-in;
    border-radius: 3px;
}
#helpline,#helpline:hover {
    background-image: linear-gradient(to right, var(--primary), var(--pink));
    /* background-color: var(--primary); */
    color: var(--white) !important;
    border-radius: 4px;
    padding: 8px 16px !important;
}
`;

export default withRouter(Navbar)