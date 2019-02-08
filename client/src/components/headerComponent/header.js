import React, { Component } from 'react';

class Header extends Component{
  render() {
    return (
        <header>
        <ul>
          <li><a href="#news">About</a></li>
          <li><a href='http://localhost:8888/login'>Spotify Login</a></li>

        </ul>
        </header>
    );
  }
}

export default Header;
