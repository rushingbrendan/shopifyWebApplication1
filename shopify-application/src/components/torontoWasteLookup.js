import React, { Component } from 'react';


class TorontoWasteLookup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //searchKeyword: "takeout",
            searchKeyword: "egg carton",
            //searchKeyword: "bread bag tag, milk bag tag, elastic band, rubber band, twist tie, rope, twine, string, hemp, ribbon, bow, burlap, staple, fastener, wire, florists wire, plastic tag, tape, duct tape, electrical tape, masking tape, scotch tape, painters tape, tape dispenser, chain, nylon, thread",
            rawData: [],
            matchedData: []            
        };
    }

    componentDidMount(){

    }

    /* Triggered when search button is clicked */
    handleKeyWordSearch = (event) => {
        fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        .then(res => res.json())
        .then(rawData => this.setState({rawData}));
    }

  render() {
    return (
      <div className="App">
      <h1>Toronto Waste Lookup</h1>

      
      <div>
      <input type="text"></input>
      <button id="searchButton" onClick={this.handleKeyWordSearch}>Search</button>
      </div>
      
      {this.state.rawData.filter(result=>result.keywords.match(this.state.searchKeyword)).map(item=>
        <div>
            <h2>{item.title}</h2>
            <div>
                <p>{item.body}</p>

            </div>
        </div>
      )}


      </div>
    );
  }
}

export default TorontoWasteLookup;
