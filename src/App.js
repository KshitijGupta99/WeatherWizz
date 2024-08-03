import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'

import Navbar from './components/Navbar.js';
import UpperTab from './components/UpperTab.js';
import SearchedCity from './components/SearchedCity.js';




export default class App extends Component {

  
  
    constructor(props){
      super(props);
      this.state = {
        showChild: false,
        name: ""
      };
    }
  
    


    Searched = (city) => {
      this.setState({showChild:true, name:city});
      
    };

    render(){
      //document.body.style.backgroundColor = 'cyan'
      return(
        <div className='p-3 mb-2 bg-primary-subtle text-primary-emphasis'>
          <Navbar Searched = {this.Searched}  />
          <UpperTab/>
          {this.state.showChild && <SearchedCity name = {this.state.name}/>} 
          
        </div>
      )
    }
  
}


