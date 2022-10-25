
# YumAR frontend

We are using Vite to run and bundle the frontend

## To develop do the following:

1. Make sure you have all the libraries installed:  
`npm install`
2. Run the development server:  
`npm run dev`


## General:
- We are using React Query (also called tanstack query) for fetching and doing mutation, you can read about it [here](https://tanstack.com/query/v4/docs/overview)
- We are using axios to do ajax requests. This goes inside the useQuery hook and you can take a look at the example in src/routes/example.jsx
- We are using [Material UI](https://mui.com/material-ui/) as our component library, use it to implement your UI.
- This project supports using Typescript or Javascript, so just use whatever you want.
    - To use Typescript name your react components files with .tsx or .jsx for javascript
    - Other non react code use .ts for Typescript and .js for javascript.
