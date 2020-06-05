module.exports = (sequelize,datatype)=>{
    const users = sequelize.define("users",{
        id :{
            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {type : datatype.TEXT},
        email : {type : datatype.TEXT},
        password : {type : datatype.TEXT},
        status : {
            type : datatype.TEXT,
            values : ["Approved","Pending Approval"]
        },
        roleId :{
            type : datatype.INTEGER,
            references : {
                model : "roles",
                key : "role_id"
            }
        }
    },{
        tableName : "users",
        timestamps : false
    })

    users.associate = models =>{
        users.hasOne(models.roles,{foreignKey : "role_id"});
    }

    return users;
}