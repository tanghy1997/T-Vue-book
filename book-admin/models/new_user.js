const db = require('../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const newUserSchema = new Schema({
  name:{
    type:String,
    default:''
  },
  pass:{
    type:String,
    default:''
  },
  desc: {
    type: String,
    default:''
  },
  book_store:[
    {
    book_id:{
      type:String,
      default:''
    },
    book_name:{
      type:String,
      default:''
    },
    book_img:{
      type:String,
      default:''
    },
    book_author:{
      type:String,
      default:''
    }
  }
]
});

const New = mongoose.model('new',newUserSchema)

module.exports = New;