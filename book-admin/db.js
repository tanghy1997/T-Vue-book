const mongoose = require('mongoose');// 引入mongoose插件
mongoose.Promise = global.Promise; //使用nodejs内置的promise对象
const Schema = mongoose.Schema; // Schema模型架构
mongoose.connect('mongodb://localhost/book-admin',{
    useMongoClient: true
},err=> {
    if(err) {
        console.log(err);
        console.log('数据库连接失败...');
    }
    else{
        console.log('数据库连接成功');
    }
});

module.exports = {
    mongoose: mongoose,
    Schema: Schema
}