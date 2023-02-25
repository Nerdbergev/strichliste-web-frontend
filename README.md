# Strichliste Web Frontend [![Build Status](https://travis-ci.org/strichliste/strichliste-web-frontend.svg?branch=master)](https://travis-ci.org/strichliste/strichliste-web-frontend)

SPA Frontend for the [Strichliste](http://v2.strichliste.org/) project

## Getting Started

This project is build with [typescript](https://www.typescriptlang.org/), [react](https://reactjs.org/), [redux](https://redux.js.org/), [emotion](https://emotion.sh/) and [create-react-app](https://github.com/facebook/create-react-app).

### Prerequisites

You have to use [yarn](https://yarnpkg.com/lang/en/) to build this project.

### Installing

Fetch all dependencies by

```
yarn install
```

Start the development server by

```
yarn start
```

Build the project by

```
yarn build
```

the output will be copied to the dist folder.

## Differences to the upstream version

Our fork of the strichliste-web-frontend can play multiple sounds after a transaction.  
To add a new sound you need to:
* Add the new sound file to the `<WEBROOT>/public/sounds/` folder
* [Add the new sound to the backend settings](https://github.com/Nerdbergev/strichliste-backend/blob/master/README.md#differences-to-the-upstream-version)
* Reload the frontend in your user agent

To debug if the new sound was properly added you can open the network tab in the dev tools and see if the sound file appears in the request history.

## Contributing / FAQ

### Commit Messages

please follow the [angular commit message guidlines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

### Ui Component Framework

all basic components are found inside the `src/bricks` folder. (Lego pun intended)

## End 2 End Tests

We do have e2e tests with cypress check our [test repo](https://github.com/strichliste/strichliste-web-e2e)
