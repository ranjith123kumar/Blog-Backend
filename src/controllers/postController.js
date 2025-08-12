const BlogPostModel = require("../models/blogpost" );

const userCreateController = async (req, res) => {
  try {
    const userData = req.body;
    const storeData = new BlogPostModel(userData);
    await storeData.save();
    res.status(201).send("User Data Saved Successfully"); 
  } catch (error) {
    res.status(500).send("Error when create users")
  }
  
};


const userGetController = async (req, res)=>{
  try {
    const getUser = await BlogPostModel.find();
    return res.status(200).send({data:getUser});
  } catch (error) {
    return res.status(500).send("Error when get users")
  }
};

const userUpdateController = async (req, res)=>{
  try {
    const id = req.params.id
    const updateUser = await BlogPostModel.findByIdAndUpdate(id,req.body, {new:true});
    //const {tag, title} =req.body;
    //const updateUser = await BlogPostModel.findByIdAndUpdate({tag: tag},{title:title},{new:true}); 
    res.status(200).send({data:updateUser});
    
  } catch (error) { 
    res.status(500).send("Error when update users")
  }
};

const userDeleteController = async (req, res)=>{
  try {
    const id = req.params.id
    const deleteUser = await BlogPostModel.findByIdAndDelete(id);
    // const {title,tag} =req.body;
    // const deleteUser = await BlogPostModel.findByIdAndDelete({title:title},{tag: tag},{new:true}); 
    res.status(200).send("Deleted User");
    
  } catch (error) { 
    res.status(500).send("Error when delete users");
  }
};

module.exports = { userCreateController, userGetController, userUpdateController, userDeleteController };