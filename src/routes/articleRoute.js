import Express from 'express';
import Article from '../models/Article'

const router = Express.Router();

router.get('/:name',(req,res) =>{
    const articleName = req.params.name;
    console.log(articleName)
    try{
        Article.findOne({name : articleName}).then(articleInfo => {
            console.log(articleInfo)
            res.status(200).json(articleInfo);
        })
    } catch(err){
        res.status(500).json({message: 'Error In The Server',err});
    }
})

//increase the number of upvotes for a specific article
router.post('/:name/upvote', async(req,res) => {
    const articleName = req.params.name;
    try{
        Article.findOne({name : articleName}).then(ArticleInfo => {
            const article = new Article({
                _id : ArticleInfo._id,
                name: articleName,
                upvotes: ArticleInfo.upvotes + 1,
                comments: [...ArticleInfo.comments]
            });
    
            Article.updateOne({name:articleName},article).then(() => {
                    res.status(200).json(article)
            })
        })
    } catch(err){
        res.status(500).json({message: 'Error In The Server',err});
    }
})

//Add comment to specific article
router.post('/:name/add-comment',(req,res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    try{
        Article.findOne({name : articleName}).then(ArticleInfo => {
        
            const article = new Article({
                _id : ArticleInfo._id,
                name: articleName,
                upvotes: ArticleInfo.upvotes,
                comments: [...ArticleInfo.comments,{username,text}]
            });
    
            Article.updateOne({name:articleName},article).then(() => {
                res.status(200).json(article) 
            })
        })  
    } catch(err){
        res.status(500).json({message: 'Error In The Server',err});
    }
})

module.exports = router;
