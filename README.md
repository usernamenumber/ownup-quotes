# OwnUp Quotes Lookup

## What Is This?

A frontend to the OwnUp API that retrieves home loan information.

_This tool uses an example API by default and does not retrieve real data!_

If you want to use a different API endpoint, you can set it in your `.env` file (see setup instructions below).

## Dependencies

- react
- redux / react-redux
- enzyme (for testing form events)
- react-mock-store (for testing interactions with redux)

## Setup

1. create a copy of `EXAMPLE.env` called `.env` and place your OwnUp API key in it.
2. Install dependencies

    ```
    yarn
    ```
3. (optional) Run tests

    ```
    yarn test
    ```
4. Start server

    ```
    yarn start
    ```

You should then be able to access the server at http://localhost:3000

## A note about API key storage

For simplicity's sake the API key is stored in `.env`. However, [this is not safe for production](https://www.rockyourcode.com/secret-keys-in-react/). In a real implementation, keys should be stored by a separate backend process. 

## Things I would do with more time to spend on this project

- Implement the CSS using something with cleaner syntax, like sass or whatever the cool kids use these days
- Implement the input form with divs and pure CSS instead of old-school table layout
- Look into react form-handling helpers, like [formik](https://github.com/formium/formik)
- Figure out why `text-overflow: hidden` isn't working in the output table (_grumble grumble_)