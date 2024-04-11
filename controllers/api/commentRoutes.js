const router = require("express").Router()
const {Comment} = require("../../models")
// /api/comments

router.post("/", async (req, res)=>{
    try{
        const newComment = await Comment.create({
            ...req.body,
            //user_id: req.session.user_id
        })
        res.json(newComment)
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports = router