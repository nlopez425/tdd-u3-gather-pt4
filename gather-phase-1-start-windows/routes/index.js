const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

// Add additional routes below:
router.get('/items/create',  (req, res, next) => {
  res.render('create');
});

router.post('/items/create',async (req,res,next)=>{
  const {title, description, imageUrl} = req.body;
  const item = new Item({title, description, imageUrl});
  await item.validateSync();

  if(item.errors){
    res.status(400).render('create',{item:item});
  }else{
    await item.save();
    res.redirect('/');
  }

})

router.get('/items/:id',async (req,res,next)=>{
  const item = await Item.findOne({"_id":req.params.id});
  res.render('single',{item:item})
})
module.exports = router;
