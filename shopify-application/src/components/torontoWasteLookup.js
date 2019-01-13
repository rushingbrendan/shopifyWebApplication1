import React, { Component } from 'react';
import './torontoWasteLookup.css';


class TorontoWasteLookup extends Component {

    
    constructor(props) {
        
        
        super(props);
        this.state = {
            searchInput: '',
            //searchKeyword: "takeout",
            searchKeyword: "egg carton",
            //searchKeyword: "bread bag tag, milk bag tag, elastic band, rubber band, twist tie, rope, twine, string, hemp, ribbon, bow, burlap, staple, fastener, wire, florists wire, plastic tag, tape, duct tape, electrical tape, masking tape, scotch tape, painters tape, tape dispenser, chain, nylon, thread",
            rawData: [],
            matchedData: [],
            favourites: [],
            selectedFavourite: "Oversize (flooring & carpeting)"
        };
    }

    componentDidMount(){

    }

    updateSearchInput(event) {
        this.setState({
          searchInput: event.target.value
        });
    }

    updateFavourites = (event) => {
        this.setState({
            selectedFavourite: event.target.value    
          });

          if(event.target.checked === true){
            this.state.favourites.push(event.target.value)      
          }
          else if (event.target.checked === false){
                // Find and remove item from an array
                var i = this.state.favourites.indexOf(event.target.value);
                if(i !== -1) {
	                this.state.favourites.splice(i, 1);
                }
            //this.state.favourites.pop(event.target.value)      
          }
        
      }

    /* Triggered when search button is clicked */
    handleKeywordSearch = (event) => {
        fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        .then(res => res.json())
        .then(rawData => this.setState({rawData}));
    }

    getDataFromAPI = (event) => {
        return(              
            <div>
            {this.state.rawData.filter(result=>result.keywords.match(this.state.searchInput)).map(item=>
            
              <div className="APIreturnedDataFont" >      
                  <table border="1">
                      <tbody>
                          <td width="5" align="right">
                              <input type="checkbox" value={item.title} onChange={this.updateFavourites} defaultChecked={false}></input>
                          </td>
                          <td width ="500 px" align="left">
                              <h4>&nbsp;&nbsp;{item.title}</h4>
                          </td>                    
                          <td width="700 px" align="left">
                          
                            <div dangerouslySetInnerHTML={{
                                __html: item.body.split('&lt;').join('<').split('&gt;').join('>')
                                }} />                                                          
                          </td>      
                      </tbody>
                  </table>                      
              </div>
            )}      
      </div>
        )
    }



    displayCurrentFavourite = (event) => {
        return(              
            <div>
            {this.state.rawData.filter(result=>result.title.match(this.state.selectedFavourite)).map(item=>
            
              <div className="APIreturnedDataFont" >      
                  <table border="1">
                      <tbody>
                          <td width="5" align="right">
                              <input type="checkbox" value={item.title} onChange={this.updateFavourites} defaultChecked={false}></input>
                          </td>
                          <td width ="500 px" align="left">
                              <h4>&nbsp;&nbsp;{item.title}</h4>
                          </td>                    
                          <td width="700 px" align="left">
                          
                            <div dangerouslySetInnerHTML={{
                                __html: item.body.split('&lt;').join('<').split('&gt;').join('>')
                                }} />                                                          
                          </td>      
                      </tbody>
                  </table>                      
              </div>
            )}      
      </div>
        )
    }


    displayUserFavourites = (event) => {
        return(
            <div>
                {this.state.favourites.map(selectedFavourite=>
                <div>
                    {this.state.rawData.map(selectedItem =>
                        {selectedItem.title.match(selectedFavourite)(selectedItem =>

                            <div className="APIreturnedDataFont" >      
                            <table border="1">
                                <tbody>                                
                                    <td width="5" align="right">
                                        <input type="checkbox" value={selectedItem.title} onChange={this.updateFavourites} defaultChecked={false}></input>
                                    </td>
                                    <td width ="500 px" align="left">
                                        <h4>&nbsp;&nbsp;{selectedItem.title}</h4>
                                    </td>                    
                                    <td width="700 px" align="left">
                                    
                                      <div dangerouslySetInnerHTML={{
                                          __html: selectedItem.body.split('&lt;').join('<').split('&gt;').join('>')
                                          }} />                                                          
                                    </td>      
                                </tbody>
                            </table>                      
                        </div>
                            
                        )}
                            
                        
                        )} 
                    </div>
                )}                
            </div>    
        )}






    

  render() {

      
    return (
      <div className="App">
      <br className ="spaceAboveHeader"></br>
      <div className="headerBox">
      <h1>Toronto Waste Lookup</h1>
      </div>
      <br className ="spaceUnderHeader"></br>

      <div>
      <input type="text" className="searchInput" value={this.state.searchInput} onChange={event => this.updateSearchInput(event)}></input>
            
      <button id="searchButton" className="searchButton" onClick={this.handleKeywordSearch}>Search</button>
      </div>


      <br className ="spaceUnderHeader"></br>

      <div>
      {this.state.favourites.map(favourites=>
            
        <div className="APIreturnedDataFont" > 
        {favourites}     

            

        </div>
        )}

        </div>


      {this.getDataFromAPI()}

      <br className ="spaceUnderHeader"></br>
      <h1>Current Favourite</h1>
      {this.displayCurrentFavourite()}




      </div>
    );
    
  }

  
}

export default TorontoWasteLookup;
