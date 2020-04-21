# Flightinator

## Info
Currently, this is broken into 2 parts:

The frontend in `flight-app`  and the backend in `backend`.  Both are using Node.js
with the frontend being using react and the backend using express.

## How to start
If you haven't already, install Git and [Node.js](https://nodejs.org/en/download/) however you prefer.

## Clone the repo wherever you want
`git clone https://github.com/zain08816/databases.git`

## Navigate into databases
`cd databases`

I suggest having 2 terminal windows open as you will need to have two servers
running and it will be easier to control with seperate windows.

## Download the password.js file
* put it in `backend/main/password.js`

### In one terminal (starting dev server):
```bash
cd flight-app
npm install
npm start
```
### In the other window (starting backend):
```bash
cd backend
npm install
npm start
```
This will start the frontend dev server hosted on `http://localhost:3000/` and
a backend server hosted on `http://localhost:5000/` (the frontend will communicate with this).
