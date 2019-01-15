import React, { Component } from 'react';
import './torontoWasteLookup.css';
//import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

library.add(faStar);
library.add(faSearch);


/*

TO DO:



    3. align plain text




*/

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

        //this.updateFavourites = this.updateFavourites.bind(this);
    }

    componentDidMount(){
        fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        .then(res => res.json())
        .then(rawData => this.setState({rawData}));
    }

    updateSearchInput(event) {

        this.setState({
          searchInput: event.target.value
        });
        console.log("in updateSearchInput: "+event.target.value);

        
    }

    updateFavourites = event => {        
        this.setState({
            selectedFavourite: event 
          });
          
          if (this.state.favourites.includes(event)){
            // Find and remove item from an array
            var i = this.state.favourites.indexOf(event);
            if(i !== -1) {
                this.state.favourites.splice(i, 1);
            }  
          }
          else{
            this.state.favourites.push(event);   
          }
    }

    /* Triggered when search button is clicked */
    submitForm = (event) => {

        this.setState({
            searchKeyword: this.state.searchInput
          });
        
          console.log("in submit form. keyword: " + this.state.searchKeyword);

        

    }

    getDataFromAPI = (event) => {


        if (this.state.searchKeyword !== ""){
            return(
                <div>
                {this.state.rawData.filter(result=>result.keywords.includes(this.state.searchKeyword)).map(item=>            
                    <div className="APIreturnedDataFont" >                                      
                        <div className="checkboxColumn">
                            <br></br>
                            
                            <FontAwesomeIcon size="2x" icon="star"
                            onClick={() => this.updateFavourites(item.title)} className={this.determineStarType(item.title)}/>                                                      
                        </div>
                        <div className="titleColumn">
                            <h4>{item.title}</h4>
                        </div>                    
                        <div className="horizontalPaddingColumn"></div>
                            <div className="bodyColumn">
                    
                            <div dangerouslySetInnerHTML={{
                                __html: item.body.split('&lt;').join('<').split('&gt;').join('>').split(/&amp;nbsp;/g).join(' ')
                            }} />                                                          
                        </div>                                              
                    </div>                    
                )}                
              </div>
                )
        }
    
        else{
            return (<div></div>)
        }
    }




    displayUserFavouritesFunction = (event) => {
        if ((this.state.favourites.length) > 1){
            return(
                <div>
                        <div className="favouritesBackground" >
                        <div className ="searchFrame">
                    
                    
                    {this.displayFavouritesTitle()}
                    

                {this.state.rawData.filter(result=>this.state.favourites.includes(result.title)).map(item=>                                                        
                    <div className="alignFavouriteData">                                      
                        <div className="checkboxColumn">
                            <br></br>
                            
                            <FontAwesomeIcon size="2x" icon="star"
                            onClick={() => this.updateFavourites(item.title)} 
                            className={this.determineStarType(item.title)}/>                                
                            
                            
                        </div>
                        <div className="titleColumn">
                            <h4>{item.title}</h4>
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
                    <br className ="spaceUnderFavouriteData"></br>
                    </div>
                    
                </div>
                
          
            )

        }
        else{
            return(<div></div>)
        }    
    }

    displayFavouritesTitle = (event) => {
        if ((this.state.favourites.length) > 1){
            return(
                <div className="favouritesContainer">
                    
                    <div className="alignFavouriteTitle">
                        <p className="favouritesTitle">Favourites</p>
                    </div>

                    <br className="spaceUnderFavouritesTitle"></br>
                </div>
            )
        }
        else{
            return(<div></div>)
        }    
    }

    


    determineStarType(itemTitle) {
        if (this.state.favourites.includes(itemTitle)){
            return "starButtonActivated";
        }
        else{
            return "starButton";
        }
    }


  render() {

      
    return (
        
      <div className="App">
        



        
        <div className="headerBox">
        <h1 className="headerTitle">Toronto Waste Lookup</h1>
        </div>
        
        <br className ="spaceUnderHeader"></br>

        <div className ="searchFrame">
            <input type="text" className="searchInput"  placeholder="Enter search keyword..."
                onChange={event => this.updateSearchInput(event)}
                onKeyDown={event => {
                    console.log("searchInputLength " + this.state.searchInput.length)
                    
                    if (event.target.value === ''){
                        this.submitForm()
                    }
                    else if (event.key === 'Enter') {
                      this.submitForm()}
                      else if (event.key === 'Backspace'){
                          console.log("backspace pressed - searchInputLength: "+ this.state.searchInput.length)                          
                      }
                  }}>
            </input>     
                     
            <button className="searchButton" id="searchButton" type="button" onClick={this.submitForm}>
                <i className="fa fa-search fa-4x"></i>
            </button>
        </div>

        
        <div className ="searchFrame">
            {this.getDataFromAPI()}
            <br className ="spaceUnderWasteData"></br>
        </div>

                {this.displayUserFavouritesFunction()}
                
            </div>

    );
    
  }

  
}

export default TorontoWasteLookup;
