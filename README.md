# Voice-Search

Voice Recognition to play Spotify Music using React

## One command, just say: 

### OK React play me {Song game/Playlist name} 

### To Deploy:

* Clone this repository
* Edit the `client_id`, `secret id` and `redirect_url`found in `Authoriziation_Code`, `Client_Credientials`, `implicit_grant`to your own credentials (This informaiton will be found in your Spotify Developers Account)
* If you are running this on localhost then you do not need to change anything further, otherwise see below.
* In Autherization_code `folder` run `node app.js` 
* In the `Client` folder run `npm start`. 
* Run `node Authorization_Code/App.js` and `npm start client/app.js`


### On Domains

* Edit app.js found in `Authoerization_Code`, on line 107 change `http://localhost:3000` to `yourdomain:3000`
* In app.js found in `client` folder, change all occurances of the same path(for eg `http://localhost:{PORT}`) to your domain however the port number should remain the same. 


