import {mongoose, uniqueValidator} from "mongoose";


//roles
const roles = {
    values: ['Admin', 'User'],
    message: '{VALUE} no es un rol válido'
}

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is necessary']
    },
    lastName: {
        type: String,
        required: [true, 'The last name is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is necessary']
    },
    password: {
        type: String,
        required: [true, 'The password is necessary']
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'User',
        enum: roles
    },
    active: {
        type: Boolean,
        default: true
    }
})

// Delete pass of JSON response
userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.pass;
    return obj;
}



//convert to model
const User = mongoose.model('User', userSchema);

export default User;