const express = require("express")
const router = express.Router()

const orm = require('../config/orm')

router.get("/",function (req,res){
    orm.selectAllCategories(function(err,category){
        if(err){
            return res.status(501).json({
                message:"ops sth bad happend"
    
            })
        }        
        res.render("index",{category,style:"index",jsFile:"index"})
    })   
})


router.get("/all",function (req,res){
    orm.selectAll(function(err,words){
        if(err){
            return res.status(501).json({
                message:"couldnt query from database"
            })
        }
        res.render("all",{words,style:"all",jsFile:"all"})
    })
})

router.post("/add-category",(req,res)=>{

    const category_name = req.body.category_name;
    orm.addNewCategory(category_name,function(err,category_name){
        if(err){
            return res.status(401).json({
                message:"not able to add category"
            })
        }
        return res.json({
            category_name:category_name
        })
    })
})  

router.post("/add",(req,res)=>{
    const category = req.body.category;
    const word_name = req.body.word_name;
    const word_meaning = req.body.word_meaning;
    const full_english_meaning = req.body.full_english_meaning;
    
    orm.insertOne(category,word_name,word_meaning,full_english_meaning,function(err,word){
        if(err){
            console.log(err);
            return res.status(401).json({
                message: "not able to add the word"
            })
        }
        return res.json({
            category:category,
            word_name:word_name,
            word_meaning:word_meaning,
            full_english_meaning:full_english_meaning,
        })
        
    })
})

router.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    orm.deleteOne(id,function(err,word){
        if(err){
            res.status(501).json({
                message:"not able to delete this word"
            })
        }

        return res.json({
            id
        })
    })
})

router.delete("/delete-category/:name",(req,res)=>{
    const categoryName = req.params.name;
    
    orm.deleteCategory(categoryName,function(err,categoryName){
        if(err){
            res.status(501).json({
                message:"not able to delete this category"
            })
        }

        return res.json({
            categoryName
        })
    })
})


module.exports = router