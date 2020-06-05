const http = require("http");
const app = require("./app")
const db = require("./models/db")

const server = http.createServer(app);

db.connect.sync({force : true}).then(()=>{
    console.log("Table reCreated");
    db.roles.create({role_name : "user",permission : "read"});
    db.roles.create({role_name : "seller",permission : "read,write"})
})

server.listen(3000);

