import React, { Component } from "react";
import './App.css';

class App extends Component {
  state = {
    searchParam: "",
    gifsList: []
  }

  fetchGhiphys = () => {
    const key = "Sbo9lDsCSy4UC17qPvLd3IowQmgap5ng";
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=cheeseburgers`)
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
      <div className="App">
        <header>
          <h1>GIPHYFY</h1>
        </header>
        <div>
          <form>
            <label htmlFor="gsearch">Search</label>
            <input name="search" id="gsearch" />
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
