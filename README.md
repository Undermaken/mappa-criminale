<img src="public/franchino.png"/>

## Mappa Criminale
This is a little tribute to [Franchino Er Criminale](https://www.youtube.com/c/FranchinoErCriminale) and his food trips.

### How is it made?
**main technologies**
- NextJS
- [react-google-map](https://github.com/google-map-react/google-map-react)
- [Python](/scripts/kml_to_json.py) to convert KML into JSON 

### Why does it use React17? 
this is because of **[this](https://github.com/google-map-react/google-map-react/issues/1117)** bug on [react-google-map](https://github.com/google-map-react/google-map-react) that 
causes markers flickering when scrolling the map 

### Setup & Run
install all dependencies
`yarn install`

`yarn build; yarn start`
open you browser on [http://localhost:3000/](http://localhost:3000/)

if you want to run it in development mode (hot reload)
`yarn dev;`

