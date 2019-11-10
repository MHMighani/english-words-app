const mysql = require("mysql")
const configInformation = require("./config")
const dbName = "english_words"

let connection = mysql.createConnection(configInformation)

var sqlCommand = `
    create database ${dbName};

    use ${dbName};

    create table all_categories(
        name varchar(20) not null default "others",
        primary key(name)
    );

    insert into all_categories(name) values("others");
    
    create table all_words(
        id integer not null auto_increment,
        english_word varchar(30),
        meaning varchar(100),
        full_english_meaning varchar(500) default null,
        primary key(id),
        category varchar(20) not null default "others",
        foreign key(category) 
            references all_categories(name)
            on delete cascade
    );

    SET foreign_key_checks = 0;
    ALTER TABLE all_words CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;
`
//for checking if database exist or not 
var sqlCommand2 = `show databases like "${dbName}"`


connection.connect(function(err){
    if(err) throw err;
    
    connection.query(sqlCommand2,(err,result)=>{
        if(err) throw err;
        if(typeof(result[0])==="undefined"){
            console.log("connected but yet no table or database is created");
            connection.query(sqlCommand, (err,result)=>{
                if(err) throw err;
                console.log("Database is created\nConnected!!!");
        })
        }else{
            connection.query(`use ${dbName}`,(err,result)=>{
                if(err) throw err;
                console.log("connected!!");
                
            })
            
        }
    })
    
    
})

module.exports = connection