const express = require('express');
const router = express.Router();

const New = require('../../../models/new_user');

router.post('/create',(req,res)=> {
  var model = new New(req.body)
  model.save()
    .then(data => {
      console.log(data)
      res.json({
        status:'y',
        msg: '保存成功',
        data:data
      })
    })
})

router.post('/login',(req,res) => {
  console.log(req.body)
  New.findOne(
    {name:req.body.name}
  ).then(data=>{
    console.log(data)
    var strPass = req.body.pass
    if(strPass == data.pass){
      res.json({
        status:'y',
        msg:'登陆成功',
        data
      })
    }else{
      res.json({
        status: 'n',
        msg: '用户密码错误'
      })
    }
    // console.log(data)
    // res.json({
    //   status:'y',
    //   msg:'获取数据成功',
    //   data
    // })
  })
  .catch(err => {
    console.log(err)
    res.json({
      status:'n',
      msg:'服务器内部错误'
    })
  })
})

router.post('/update/:name',(req,res)=>{
  // console.log(req.body)
 if(req.params.name == 'undefined'){
  res.json({
    status:'n',
    msg:'你还未登录，请登录'
  })
 }else{
  New.findOne({name:req.params.name}).then(userDoc=>{
    if(userDoc){
      var booksItem =''
      userDoc.book_store.forEach(function(item) {
        if(item.book_id==req.body.book_id){
          booksItem = item
        }
      });
      if(booksItem){
          res.json({
            status:'n',
            msg:'已在书架中'
          })
      }else{
        userDoc.book_store.push(req.body)
        userDoc.save().then(
          res.json({
            status:'y',
            msg:'加入书架成功'
          })
        )
      }
    }
  })
 }
})

router.get('/book/:name',(req,res)=>{
  New.findOne({name:req.params.name})
    .then(data => {
      res.json({
        status:'y',
        msg:'增加成功',
        data:data
      })
    })
})

router.post('/delbook',(req,res)=>{
  // console.log(req.body)
// $pull 推出 =>删除book_store下的为req.body.book_id的书
  New.findOneAndUpdate({name:req.body.name},{$pull:{book_store:{book_id:req.body.book_id}}}).then(data=>{
    res.json({
      status:'y',
      msg:'删除成功',
      data:data
    })
  })
})
module.exports = router;