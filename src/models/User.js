const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});
//UserSchema.method('encryptPassword', async function(password) {
//UserSchema.methods.encryptPassword = async (password) => {
//    const salt = await bcrypt.genSalt(10);
//    const hash = await bcrypt.hash(password, salt);
//    return hash;
//  });


UserSchema.methods.matchPassword = async function (password){
    console.log(this.password);
    console.log(password);
    return await bcrypt.compare(password,this.password);
};
UserSchema.method({
    encryptPassword: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    },
    validPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  });  
//  UserSchema.method.validatePassword('validatePassword',async function validatePassword(data) {
//    return bcrypt.compare(data, this.password);
//  });
  
const model = mongoose.model('User',UserSchema);
module.exports = model;
//module.exports = mongoose.model('User', UserSchema);
