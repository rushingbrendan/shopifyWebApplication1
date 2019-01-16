//React Component
import React, { Component } from 'react';

//CSS for App
import './torontoWasteLookup.css';

/*  FontAwesomesome Icon Library used for star icon and search icon

star icon: https://fontawesome.com/icons/star?style=solid
search icon: https://fontawesome.com/icons/search?style=solid

This icon is licensed under the Creative Commons Attribution 4.0 International license.

License Link: https://fontawesome.com/license
*/
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

library.add(faStar);
library.add(faSearch);



/*
    Class name: TorontoWasteLookup
    Purpose:    Display Toronto waste data from API on webpage
*/
class TorontoWasteLookup extends Component {

    
    constructor(props) {
        
        
        super(props);
        this.state = {
            //text from search input
            searchInput: '',        

            //user keyword used to filter API data    
            searchKeyword: '',            

            //data from API
            rawData: [],   

            //user added favourites         
            favourites: [],            
        };        
    }

    /* 
        Function name: componentDidMount
        
        Purpose:    Function is called when page has been loaded.
                    Data is received from the toronto waste services API.

        Parameters:     none
        Return:         none                
    */    
    componentDidMount(){
        //Fetch data from Toronto waste services API
        fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        
        //Complete promise to receive body text as JSON object
        .then(res => res.json())

        //Add JSON object to rawData array in state
        .then(rawData => this.setState({rawData}));
    }

    /* 
        Function name: updateSearchInput
        
        Purpose:    Function is called when the text in the input search box has changed.
                    The value from the event is put into searchInput variable in class state.
                
        Parameters:     event
        Return:         true
    */
    updateSearchInput(event) {

        this.setState({
          searchInput: event.target.value
        });
        
        return true;
    }

    /* 
        Function name: updateFavourites
        
        Purpose:    Function is called when the user clicks on one of the favourite icons beside
                    a waste data item.
                    The item's title is collected and added to the favourites array if it does not 
                    already exist.
                    If the item is already in the favourites array then it is removed.
                
        Parameters:     event
        Return:         true                
    */
    updateFavourites = event => {  

        this.setState({
            selectedFavourite: event
          });
        
          
        //Check if selected item is already in array
        if (this.state.favourites.includes(event)){
            //Item is found in array
            var i = this.state.favourites.indexOf(event);
            if(i !== -1) {
                //remove item from array
                this.state.favourites.splice(i, 1);
            }  
          }
          //Item is not in array
          else{
            //add item to array
            this.state.favourites.push(event);   
          }
          return true;
    }

     /* 
        Function name: submitForm
        
        Purpose:    Function is used to pass the value from the search input box to the searchKeyword variable.
                    The searchKeyword variable determines the data that is shown on the screen from the waste data API.

                    This function is called:
                        -User presses enter key in search input box
                        -User clears text in search input box
                        -User clicks search button

        Parameters:     event
        Return:         true                
    */
    submitForm = (event) => {

        this.setState({
            searchKeyword: this.state.searchInput
          });
          
          return true;
    }

    /* 
        Function name: getDataFromAPI
        
        Purpose:    Function is used to display data from the Toronto waste data API.
                    The data displayed must have keywords matching the user input in search box.
                    The waste data title, and body are displayed.
                    The user must perform a search to view the data.
                    A star icon is placed next to each item for the user to press to add/remove the item to favourites list.
                    The data in the body is received from the API in HTML format. The following items are changed.
                    &lt; converted to <
                    &gt; converted to >
                    &nbsp; converted to single white space
                                                                                                    
        Parameters:     event
        Return:         true                
    */
    getDataFromAPI = (event) => {
    
        //make sure that searchKeyword is not blank
        if ((this.state.searchKeyword !== "") && (this.state.searchInput !== "")){
            return(
                <div>
                {this.state.rawData.filter(result=>result.keywords.includes(this.state.searchKeyword)).map(item=>            
                    <div className="APIreturnedDataFont" >                                      
                        <div className="checkboxColumn">
                            <br></br>
                            
                            <FontAwesomeIcon size="1x" icon="star" color={this.determineStarType(item.title)}
                            onClick={() => this.updateFavourites(item.title)} />                                                      
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

    /* 
        Function name: displayUserFavourites
        
        Purpose:    Function is used to display data from the Toronto waste data API that the user has added to favourites list.
                    The data displayed must have keywords matching the user input in search box.
                    The waste data title, and body are displayed.
                    The user must perform a search to view the data.
                    A star icon is placed next to each item for the user to press to add/remove the item to favourites list.
                    The data in the body is received from the API in HTML format. The following items are changed.
                    &lt; converted to <
                    &gt; converted to >
                    &nbsp; converted to single white space
                                                                                                    
        Parameters:     event
        Return:         true                
    */
    displayUserFavouritesFunction = (event) => {
        

        //only display if there is more than 1 favourite
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
                            
                            <FontAwesomeIcon size="1x" icon="star" color="#2B985E"
                            onClick={() => this.updateFavourites(item.title)} />                                
                                                        
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
                    <div className ="spaceUnderFavouriteData"></div>
                    </div>
                    
                </div>
                
          
            )

        }
        else{
            return(<div></div>)
        }    
    }

    /* 
        Function name: displayFavouritesTitle
        
        Purpose:    Function is used to display the user favourites title heading
                                                                                                    
        Parameters:     event
        Return:         favourites title
    */    
    displayFavouritesTitle = (event) => {
        //only display if there are more than 1 favourites
        if ((this.state.favourites.length) > 1){
            return(
                <div className="favouritesContainer">
                    
                    <div className="alignFavouriteTitle">
                        <p className="favouritesTitle">Favourites</p>
                    </div>

                    <div className="spaceUnderFavouritesTitle"></div>
                </div>
            )
        }
        else{
            return(<div></div>)
        }    
    }

    

    /* 
        Function name: determineStarType
        
        Purpose:    Function is toggle the star icons className.
                    The icon is grey if the item is not in the user's favourites list.
                    The icon is green if the item is in the user's favourites list.
                                                                                                    
        Parameters:     itemTitle
        Return:         className      
    */
    determineStarType(itemTitle) {
        if (this.state.favourites.includes(itemTitle)){
            //make star green
            return "#2B985E";
        }
        else{
            //make star grey
            return "#AAAAAA";
        }
    }

    /* 
        Function name: render
        
        Purpose:    Function is used to render the entire Toronto wasta data app.
                                                                                                    
        Parameters:     none
        Return:         waste data app                
    */
  render() {

      
    return (
        
      <div className="App">
            
        <div className="headerBox">
            <h1 className="headerTitle">Toronto Waste Lookup</h1>
        </div>        

        <div className ="spaceUnderHeader"></div>
        <div className ="searchFrame">

            <input type="text" className="searchInput"  placeholder="Enter search keyword..." 
                onChange={event => this.updateSearchInput(event)}
                onKeyDown={event => {
                    if (event.target.value === ''){
                        this.submitForm()
                    }                                        
                    else if (event.key === 'Enter') {                        
                      this.submitForm();
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