#Database Configuration

add `connection.js` to the `config` folder and connect your database to the app with code below filled by your database configuration:

```
const mysql = require("mysql")

let connection = mysql.createConnection({
    host:"localhost",
    user:"",
    password:"",
    database:"english_words"
})

connection.connect()

module.exports = connection
```