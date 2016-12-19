import mongoose, {Schema} from 'mongoose';

// init user
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  list: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }]
});

const ListSchema = new Schema({
  title: String,
  content: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('User', UserSchema);
mongoose.model('List', ListSchema);
