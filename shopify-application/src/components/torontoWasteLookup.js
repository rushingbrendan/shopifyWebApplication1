import React, { Component } from 'react';
import './torontoWasteLookup.css';
//import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';


class TorontoWasteLookup extends Component {

    
    constructor(props) {
        
        
        super(props);
        this.state = {
            searchInput: '',            
            searchKeyword: '',            
            rawData: [],
            matchedData: [],
            favourites: [],
            selectedFavourite: ''
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
        {this.state.rawData.filter(result=>result.keywords.includes(this.state.searchInput)).map(item=>            
            <div className="APIreturnedDataFont" >                                      
                <div className="checkboxColumn">
                    <br></br>
                <input type="checkbox" className="favouriteCheckbox" key={item.title} value={item.title} onChange={this.updateFavourites} 
                    defaultChecked={this.determineCheckStatus}>
                </input>
            </div>
            <div className="titleColumn">
                <h4>&nbsp;&nbsp;{item.title}</h4>
            </div>                    
            <div className="horizontalPaddingColumn"></div>
                <div className="bodyColumn">
        
                <div dangerouslySetInnerHTML={{
                    __html: item.body.split('&lt;').join('<').split('&gt;').join('>')
                }} />                                                          
            </div>                                              
        </div>
        )}      
      </div>
        )
    }




    displayUserFavouritesFunction = (event) => {

        if ((this.state.favourites.length) > 1){
            return(
                <div>

                {this.state.rawData.filter(result=>this.state.favourites.includes(result.title)).map(item=>                    
                <div className="APIreturnedDataFont" >                                      
                    <div className="checkboxColumn">
                        <br></br>
                        <input type="checkbox" className="favouriteCheckbox" key={item.title} value={item.title} onChange={this.updateFavourites} 
                            checked={true}>
                        </input>
                    </div>
                <div className="titleColumn">
                    <h4>&nbsp;&nbsp;{item.title}</h4>
                </div>                    
                <div className="horizontalPaddingColumn"></div>
                    <div className="bodyColumn">
            
                    <div dangerouslySetInnerHTML={{
                        __html: item.body.split('&lt;').join('<').split('&gt;').join('>')
                    }} />                                                          
                    </div>  
                </div>                                            
            
                )}      
          </div>
            )

        }
        else{
            return(<div></div>)
        }    
    }

    


    determineCheckStatus = (event) => {
        if (this.state.favourites.includes(event.target.value)){
            return true;
        }
        else{
            return false;
        }
    }


  render() {

      
    return (
        
      <div className="App">
        <br></br>
        
        <div className="headerBox">
        <h1 className="headerTitle">Toronto Waste Lookup</h1>
        </div>
        
        <br className ="spaceUnderHeader"></br>

        <div className ="searchFrame">
            <input type="text" className="searchInput" value={this.state.searchInput} placeholder="Enter search keyword..."
                onChange={event => this.updateSearchInput(event)}></input>     
                                
            <button className="searchButton" id="searchButton" type="button" onClick={this.handleKeywordSearch}>
                <i class="fa fa-search fa-3x"></i>
            </button>
        </div>

        
      <div className ="searchFrame">
        {this.getDataFromAPI()}

        <div className="favouritesContainer">
            <p className="favouritesTitle">Favourites</p>
            <br className="spaceUnderHeader"></br>
            </div>

        {this.displayUserFavouritesFunction()}

        </div>
      </div>
    );
    
  }

  
}

export default TorontoWasteLookup;
