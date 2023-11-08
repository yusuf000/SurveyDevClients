import "../plugins/fontawesome-free/css/all.min.css"
import logo from "../img/AdminLTELogo.png"
import defaultImage from "../img/defaultAvatar.png"

export function Home(){
    return (
        <div>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>AdminLTE 3 | Dashboard 3</title>
            {/* Google Font: Source Sans Pro */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
            />
            {/* IonIcons */}
            <link
                rel="stylesheet"
                href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
            />

            <div className="wrapper">
                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                                <i className="fas fa-bars" />
                            </a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="/" className="nav-link">
                                Home
                            </a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* /.navbar */}


                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="/" className="brand-link">
                        <img
                            src={logo}
                            alt="SurveyKing Logo"
                            className="brand-image img-circle elevation-3"
                            style={{ opacity: ".8" }}
                        />
                        <span className="brand-text font-weight-light">SurveyKing</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img
                                    src={defaultImage}
                                    className="img-circle elevation-2"
                                    alt="User Image"
                                />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">
                                    Alexander Pierce
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* /.sidebar */}
                </aside>


                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Survey King</h1>
                                </div>
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                </div>
                {/* /.control-sidebar */}


                {/* Main Footer */}
                <footer className="main-footer">
                    <strong>
                        Copyright © 2023 <a href="https://adminlte.io">SurveyKing</a>.
                    </strong>
                     All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 1.0.0
                    </div>
                </footer>
            </div>
        </div>
    );
}