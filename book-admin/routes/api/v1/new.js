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
        msg:'获取数据成功',
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
  console.log(req.body)
  New.findOneAndUpdate({name:req.params.name},{$push:{book_store:req.body}})
    .then(data =>{
      res.json({
        status:'y',
        msg:'增加成功',
        data:data
      })
    })
    .catch(err => {
      console.log(err)
      res.json({
        status:'n',
        msg:'增加失败',
      })
    })
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
module.exports = router;