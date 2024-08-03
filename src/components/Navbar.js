import React, { Component } from 'react';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        };
    }

    handleChange = (e) => {
        this.setState({ searchInput: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.Searched(this.state.searchInput);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light border-bottom border-body" data-bs-theme="light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">WeatherChecker</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="d-flex w-100 mt-3 mt-lg-0" role="search" onSubmit={this.handleSubmit}>
                                <input className="form-control me-2" type="search" placeholder="Search for a city" aria-label="Search" onChange={this.handleChange}/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
