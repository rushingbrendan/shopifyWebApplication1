import React, { Component } from 'react';


class TorontoWasteLookup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            //searchKeyword: "takeout",
            searchKeyword: "egg carton",
            //searchKeyword: "bread bag tag, milk bag tag, elastic band, rubber band, twist tie, rope, twine, string, hemp, ribbon, bow, burlap, staple, fastener, wire, florists wire, plastic tag, tape, duct tape, electrical tape, masking tape, scotch tape, painters tape, tape dispenser, chain, nylon, thread",
            rawData: [],
            matchedData: []            
        };
    }

    componentDidMount(){

    }

    updateSearchInput(event) {
        this.setState({
          searchInput: event.target.value
        });
    }

    /* Triggered when search button is clicked */
    handleKeywordSearch = (event) => {
        fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        .then(res => res.json())
        .then(rawData => this.setState({rawData}));
    }

  render() {
    return (
      <div className="App">
      <h1>Toronto Waste Lookup</h1>

      
      
      <div>
      <input type="text" value={this.state.searchInput} onChange={event => this.updateSearchInput(event)}></input>
      <button id="searchButton" onClick={this.handleKeywordSearch}>Search</button>
      </div>
      
      {this.state.rawData.filter(result=>result.keywords.match(this.state.searchInput)).map(item=>
      
        <div>
            <h2>{item.title}</h2>
            <div>
                {item.body.split('&lt;').join('<').split('&gt;').join('>')}

            </div>
        </div>
      )}


      </div>
    );
  }
}

export default TorontoWasteLookup;
