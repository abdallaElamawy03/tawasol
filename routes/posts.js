const express = require("express")
const router = express.Router();
const{auth}=require("../utils/index")
const {check,validationResult}=require("express-validator")
const User = require("../schemaDb/User")
const Post = require("../schemaDb/Posts")



/* Post / posts 
Get/posts
get/Posts/:id
Delete / posts/ :id
put/posts/like/:id
put/posts/unlike/:id
Post/posts/comment/:id
Delete / posts/comment/:id/:comment_id
*/
// routing the express
router.post("/",auth,
    check("text","Text is required").notEmpty()
    ,
    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})


        }
        try{
            const user=await User.findById(req.user.id).select("-password")
            const newpost = new Post({
                text:req.body.text,
                name:user.name,
                user:req.user.id

            })
            const post = await newpost.save()
            res.json(post);


        }catch(err){
            console.error(err.message)
            return res.status(500).send(err.message)
        }

    }
    

)
router.get("/:id",auth,async(req,res)=>{
    try{
        const getpost=await Post.findById(req.params.id)
        if(!getpost){
            return res.status(404).json({ msg: 'Post not found'})

        }
        return res.json(getpost)

    }catch(err){
        console.error(err.message)
        res.status(500).send("server error"+ err.message)
    }
    

})
router.get("/",auth,async(req,res)=>{
    try{
        const Posts = await Post.find().sort({date:-1})
        res.json(Posts)

    }catch(err){
        console.error(err.message)
        return res.status(500).send("server Error "+err.message)
    }
})
//Like API
router.put("/like/:id",auth,async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id)
        // if(post.likes.some((like)=>like.user.toString()==req.user.id)){
        //     return res.status(400).json({msg:"the post is already likes"})
        // }
        //we can use this above instead of this code
        for(let i in post.likes){
            if(post.likes[i].user.toString()==req.user.id){
                return res.status(400).json({msg:`the post is already liked`})

            }
            
            
        }
        post.likes.unshift({user:req.user.id})//unshift is used to add => the like at the begining of the array
        await post.save()//saving the process 
        return res.json(post.likes)// response by the post likes
        

    }catch(err){
        console.error(err.message)
        return res.status(500).send("server error")
    }

})
//UnLike API
router.put("/unlike/:id",auth,async(req,res)=>{
    try{

        const post = await Post.findById(req.params.id)
        for(let i in post.likes){
            if(!post.likes[i].user.toString()==req.user.id){
                res.status(400).json(`user has not liked this post `)

                
            }
        }
        post.likes=post.likes.filter((like)=>like.user.toString()!== req.user.id)
        await post.save()
        return res.json(post.likes)
    }catch(err){
        console.error(err.message)
        return res.status(400).send(`server error` + err.message)

    }



})





//Comment API

router.post("/comment/:id",auth,
    check("text","text is required").notEmpty(),






    
async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const user = await User.findById(req.user.id).select("-password")
        const post = await Post.findById(req.params.id)

        const newComment = {
            text:req.body .text,
            name:user.name,
            user:req.user.id
        }
        post.comments.unshift(newComment)
        await post.save()
        return  res.json(post.comments)




    }catch(err){
        console.error(err.message)
        return res.status(500).send(`server error` + err.message)
    }
})


//delete the comment
router.delete("/comment/:id/:comment_id",auth,
async(req,res)=>{
   
    try{
        const post = await Post.findById(req.params.id)

        const comment = post.comments.find((comment)=>{
            return comment.id == req.params.comment_id;// identical the comment id 


        })
        if(!comment){
            return res.status(404).json({msg:`cooment does not exist `})
        }
        if(comment.user.toString()!=req.user.id){
            return res.status(401).json({msg:`the user not auth`})
        }
        post.comments=post.comments.filter((comment)=>{
            return comment.id != req.params.comment_id //=> return the comments that not having the same comment id
            


        })
       
        
        await post.save()
        res.json(post.comments)




    }catch(err){
        console.error(err.message)
        return res.status(500).send(`server error` + err.message)
    }
})



//delete post
router.delete("/:id",auth,async(req,res)=>{
    
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json(`the post not found`+err.message)

        }
        if(post.user.toString() != req.user.id){//confirming that this is the owner of the post 
           return res.status(401).json({msg:`user is not auth to remove this post`})

        }
        await post.deleteOne()

        return  res.json({msg:`the post has been removed`})


    }catch(err){
        console.error(err.message)
            res.status(500).send(`server error`+ err.message)


        
    }
})







module.exports = router;