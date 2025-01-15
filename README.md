<h1 align="center"> Nanosoft_banker_images APP back-end </h1>

## Node.js packages
| `body-parser` | `dotenv` | `express` | `mysql2` | `nodemon` | `MD5` |

<hr>

### Deploy backend
- `npm init -y` 
- `npm i body-parser dotenv express mysql2 nodemon MD5` 
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

<br>

## End-points

## Authenticate
- /login 🙇‍♂️ |`post request`| Input is required -> `UserName` , `web_password`

### check Customer ID and get Customer Name
- /Customer-info 🙇‍♂️ |`get request`| Input is required -> `CustomerID`

### check Customer ID and update Customer deails
- /Customer-info-update 🙇‍♂️ |`put request`| Input is required -> `CustomerID`, `Picture`, `Signature`, `UserID`
  


