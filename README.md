# Star Wars API Browser

A search tool for list of available Star Wars movies provided by the Star Wars API. Once selected users can choose to view details on the characters of a selected movie. All links in the application are shareable.

# Future improvements

Choose useReducer over useState to cache previous API calls and improve the apps performance. I would still avoid using Redux or another state container library due to the small size of the application.

Write more tests for the 'unhappy' paths in the application.

Improve the styling and split css between appropriate files. Handle overflow of text when resizing the application to very small screens and maybe adjust the layout to help.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the necessary packages for the app.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for performance.
The build is minified and the filenames include the hashes.\

### Local Deployment

To deploy locally, run the following commands:\
    `npm install`\
    `npm run build`\
    `serve -s build`


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

