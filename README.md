# Neighbourhood Map

This is the 8th and final project that I did for Udacity Front-End program during my Google Developer Nanodegree Scholarship. I wrote it using react and google maps 

## Description
This project  was written from scratch using the [Create react App](https://github.com/facebook/create-react-app) build. 
The application displays a simple map of the main coffee shops in the city center where I live. The user can interact with a menu that displays all the coffee shops in the area and also can search through them. All locations have an infobox with details. 

## Getting started 

In order to run this application on your computer just follow these steps:

* Install npm packages if you do not have them. You can downloaded it from [here](https://www.npmjs.com/).
* Clone or download the repository and go to the directory where you have cloned or downloaded it.
* Open the command line and type `npm install`. ( **Note**: React has its own special packages named `yarn`. If you are more familiar with the react library and wish to use their packages you can also write `yarn install` )
    - This application uses the following react package that will be installed automatically:
        *react-foursquare library with es5 mod for an error free build*
* Start the application by using the command line `npm start`
    - The page opens in a new browser tab/window. By default the server runs on port 3000.
    
## Dependencies 
  
 In order to load the map and the coffee shops that appear on it I have used:
   - *Google Maps API* - creates the digital map of the city center. (Documentation can be found [here](https://developers.google.com/maps/documentation/javascript/tutorial))
    - *Foursquare places API* - gets all the coffee shops in the area and populates the infowindow with extra information( Information about this API cand be found [here](https://developer.foursquare.com/places-api))
   
    
## Service Worker 
This application comes with its own service worker. In order to test the service worker you will have to be in `production mode`. To do that you need to type in command line:
* `npm run build` to create a build. 
* `serve -s buid` to run the build. By default this server runs on port 5000.
