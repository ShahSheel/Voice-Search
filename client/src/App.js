import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Header from  './components/headerComponent/header';
import SpeechRecognition from 'react-speech-recognition';
import Promise from 'promise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faMicrophone from '@fortawesome/fontawesome-free-solid/faMicrophone'

const spotifyApi = new SpotifyWebApi();

const options = {
    autoStart: false
}


class App extends Component {
    constructor(){
      super();
      const params = this.getHashParams();
      const token = params.access_token;
      if (token) {
        spotifyApi.setAccessToken(token);
      }
      this.state = {
        loggedIn: token ? true : false,
        nowPlaying: { name: 'Not Checked', albumArt: '' },
        SongLinks: {albumId: ''}
      }

    this.getQuery = this.getQuery.bind(this);
    this.playMusic = this.playMusic.bind(this);
    }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

    getNowPlaying(){
      spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
          this.setState({
            nowPlaying: {
                name: response.item.name,
                albumArt: response.item.album.images[0].url
              }
          });
        })
    }

    getQuery(event){
        event.preventDefault();
        let userCommand = event.target.transcript.value;
        let start = "play";
        let songName =   userCommand.slice(userCommand.indexOf(start) + start.length);
        this.playMusic(songName);
        console.log(songName);
    }

    playMusic(songName){
        //Pass the query to PlayMusic,
    console.log("Entered" + songName);
    spotifyApi.searchTracks(songName)
    .then((response) => {
        console.log(response.tracks.items[0].album.href);
        let URL = String(response.tracks.items[0].album.href);
        let albumID = this.getAlbumID(URL);
        this.setState({
            SongLinks: {
                albumId: albumID
            }
        });
        console.log(this.state.SongLinks.albumId);

      })
      .catch(function(err) {
        console.log(err);
      });
    }

    getAlbumID(url){
    return url.split('/').pop();
    }

    nextSong(){
        //Change song when HTML button is clicked / said
        this.spotifyApi.nextTrack();
    }

    prevSong(){
        //Change to previous song when HTML button is clicked / said
    }



render() {
     const { transcript, startListening, stopListening, resetTranscript, browserSupportsSpeechRecognition } = this.props
            if (!browserSupportsSpeechRecognition) {
                return null
            }
  return (
        <div className = "overlay">
            <Header/>
                <div className="App">
                   <iframe src={"https://open.spotify.com/embed?uri=spotify:album:" + this.state.SongLinks.albumId} width="300" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                 </div>
            <form id="speechText" onSubmit={this.getQuery}>
                <div className="center speech">
                    <input value={transcript || null } type="text" className="searchBar" id="transcript" placeholder=" Hello React, Play me some Bob Marley" />
                </div>
            </form>

            <div className = "center">
                <div className = "circle" onClick={startListening} >
                        <FontAwesomeIcon onClick={startListening} icon={faMicrophone} className = "center-everything" size='2x'/>
                    </div>
                </div>
                <div className = "logo">
                    <h1> VoiceSearch </h1>
                </div>
{/* <button onClick={startListening} className = "center  button button1 button1e button-left" >Start Recording</button>
                <button onClick={stopListening} className = "center  button white button-right" >Stop Recording</button>
*/}
        </div>

  );
}
}

export default SpeechRecognition(options)(App);
