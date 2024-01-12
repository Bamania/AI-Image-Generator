import mongoose from "mongoose";

const post=mongoose.Schema({
    name:{type:String,required:true},
    prompt:{type:String,required:true},
    photo:{type:String,required:true}
})   //schema bana lia hai ye ki database mai ye ye field save hongi

const postSchema=mongoose.model('Post',post) // one argument for model name ,other for schema  

export default postSchema;