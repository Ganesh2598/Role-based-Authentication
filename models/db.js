const Sequelize = require("sequelize");

require("dotenv").config();

const connect = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DATABASE}`)

db = {};
db.Sequelize = Sequelize;
db.connect = connect;
db.user = require("./users")(connect,Sequelize);
db.roles = require("./roles")(connect,Sequelize);

/*db.user.belongsTo(db.roles,{});
db.roles.hasOne(db.user,{});*/





module.exports = db;
