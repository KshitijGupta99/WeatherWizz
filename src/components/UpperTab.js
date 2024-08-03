import React, { Component } from 'react'
import NewsCard from './NewsCard.js';


export default class UpperTab extends Component {
  render() {
    return (
      <div>
        <div className="ms-3 mt-3 row row-cols-1 row-cols-md-4 g-4 me-3">
            <NewsCard city='London' temp='37C' weather="rainy"  />
            <NewsCard city='Mumbai' temp='37C' weather="rainy" />
            <NewsCard city='Tokyo' temp='37C' weather="rainy" />
            <NewsCard city='Delhi' temp='37C' weather="rainy" />
        </div>
      </div>
    )
  }
}
