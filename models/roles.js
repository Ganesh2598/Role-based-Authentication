module.exports = (sequelize,datatype)=>{
    const roles = sequelize.define("roles",{
        role_id : {
            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        role_name : {type : datatype.TEXT},
        permission : {type : datatype.TEXT}
    },{
        tableName : "roles",
        timestamps : false
    })

    /*roles.associate = models =>{
        roles.belongsTo(models.users,{foreignKey : "role_id", targetKey : "role_id"});
    }*/

    /*const users = {
    role_name : "user",
    permission : "read"
}

const seller = {
    role_name : "seller",
    permission : "read,write"
}

db.roles.create(users).then(data =>{
    console.log(data)
})

db.roles.create(seller).then(data =>{
    console.log(data)
})*/

    return roles;
}