<img src="public/franchino.png"/>

## Mappa Criminale
This is a little tribute to [Franchino Er Criminale](https://www.youtube.com/c/FranchinoErCriminale) and his food trips.

### Demo
https://user-images.githubusercontent.com/822471/185750956-8041d7f3-9c6b-431a-8983-899f252fb611.mp4

### Live website
[https://mappa-criminale.vercel.app/](https://mappa-criminale.vercel.app/)

### How is it made?
**main technologies**
- Language [Typescript](https://www.typescriptlang.org/)
- Framework [NextJS](https://nextjs.org/)
- UI kit [Chakra](https://chakra-ui.com/)
- Notable components [react-google-map](https://github.com/google-map-react/google-map-react)
- State management [Jotai](https://jotai.org/)
- Functional Programming enabler [fp-ts](https://github.com/gcanti/fp-ts)
- [Python](/scripts/kml_to_json.py) - script to convert KML into JSON 

### Why does it use React 17? 
this is because of **[this](https://github.com/google-map-react/google-map-react/issues/1117)** bug on [react-google-map](https://github.com/google-map-react/google-map-react) that 
causes markers flickering when scrolling the map 

### Setup & Run
1. install all dependencies<br/>
   `yarn install`
2. generate/update data<br/>
   `cd scripts;python kml_to_json.py`
3. run the app<br/>
   `yarn build; yarn start`
4. open your browser on [http://localhost:3000/](http://localhost:3000/)

if you want to run it in development mode (hot reload)<br/>
`yarn dev`

