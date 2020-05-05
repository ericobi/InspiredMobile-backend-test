import * as mongoose from 'mongoose'

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: Date
}, {
  timestamps: true
});

export default mongoose.model<mongoose.Document>('user', userSchema); //loading this module in mongoose