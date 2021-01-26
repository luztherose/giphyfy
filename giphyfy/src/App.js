import React, { Component } from "react";
import './App.css';

class App extends Component {
  state = {
    searchParam: "cheesy",
    gifsList: []
  }

  handleSearch = (event) => {
    let input = event.target.value
    this.setState({
      searchParam:input,
    });
  }
  handleSubimit = (event) => {
    event.preventDefault();
    this.fetchGhiphys();
  }
  
  fetchGhiphys = () => {
    const key = "Sbo9lDsCSy4UC17qPvLd3IowQmgap5ng";
    const searchParameter = this.state.searchParam;
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchParameter}`)
    .then( response => response.json() )
    .then((data) => {
      const imagesList = data.data.map(img => {
        return img.images
      })
      this.setState({
        gifsList: imagesList
      })
    })
    .catch(error => console.log(error))
  }
  componentDidMount() {
  this.fetchGhiphys()
  }

  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>GIPHYFY</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubimit}>
            <label htmlFor="gsearch">Search</label>
            <input type="text" name="search" id="gsearch" onChange={ this.handleSearch } autoFocus />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="giphyImagesContainer">
          {
            
            this.state.gifsList.map((gifImg, index) => {
              return (
                <div key={ index }>
                  <img src={ gifImg.original.url } alt={gifImg.original.url}></img>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
