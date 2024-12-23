<h1 align="center"> Nanosoft_banker_images APP back-end </h1>

## Node.js packages
| `body-parser` | `dotenv` | `express` | `mysql2` | `nodemon` |

<hr>

### Deploy backend
- `npm init -y` 
- `npm i body-parser dotenv express mysql2 nodemon` 
- create .env file and add database details

<hr>

### change package.json file, <br>
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },

<hr>

### To run backend
- npm start

<hr>

<br>

## End-points

### show Customer ID and get Customer Name
- /Customer-info 🙇‍♂️ |`get request`| Input is required -> `CustomerID`

### show Customer ID and get Customer Name
- /Customer-info-update 🙇‍♂️ |`post request`| Input is required -> `CustomerID`, `Picture`, `Signature`
  


