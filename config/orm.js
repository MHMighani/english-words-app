const connection = require("./connection");

async function getNumberOfRecords(){
    const sqlQuery2 = `select count(*) from all_words`;
    const result = await connection.query(sqlQuery2);
    return result
}

const orm = {
    countRecords: function(cb) {
        const sqlQuery = `select count(*) from all_words`
        connection.query(sqlQuery,function(err,data){
            if(err) cb(err,null)
            cb(null,data)
        })
    },
    selectAllCategories: function(cb){
        const sqlQuery = `select * from all_categories`
        connection.query(sqlQuery,function(err,data){
            if(err) cb(err,null)
            cb(null,data)
        })
    },
    addNewCategory: function(categoryName,cb){
        const sqlQuery = `insert into all_categories(name) value('${categoryName}')`;
        connection.query(sqlQuery,function(err,data){
            if(err) cb(err,null)
            cb(null,data)
        })
    },
    
    selectAll: function(cb) {
        connection.query("select * from all_words",function(err,data){
            if(err) cb(err,null)
            cb(null,data)
        })
    },

    insertOne: function(category,word_name,word_meaning,full_english_meaning,cb){  
        console.log(full_english_meaning);
         
        const sqlQuery1 = `insert into all_words(english_word,meaning,full_english_meaning,category) values('${word_name}',"${word_meaning}","${full_english_meaning}",'${category}')`;
        connection.query(sqlQuery1,function(err,data){
            if(err) cb(err,null)
            cb(null,data)
        })
    },
    deleteOne: function(id,cb){
        const sqlQuery = `delete from all_words where id=${id}`
        connection.query(sqlQuery,function(err,data){
            if(err) cb(err,null)
            cb(null,data)
        })
    },
    deleteCategory: function(categoryName,cb){
        const sqlQuery = `delete from all_categories where name='${categoryName}'`;
        connection.query(sqlQuery,function(err,data){
            if(err) cb(err,null)
            cb(null,data)
        })
    }
};

module.exports = orm;