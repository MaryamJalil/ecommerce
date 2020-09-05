const mongoose=require('mongoose')
//password
const crypto=require('crypto')
const uuidv1=require('uuid/v1')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    hashed_password:{
        type:String,
        required:true,
        maxlength:32
    },
   about:{
        type:String,
        trim:true,
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }
    },
    {
        timestamps:true
    }
    );
    UserSchema.virtual('password')
    .set(function(password){
        this._password=password
        // this.salt=uuidv1()
        this.salt=uuidv1();
        // this.salt=uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

        this.hashed_password=this.encryptPassword(password)
    })
    .get(function(){
        return this._password
    })
    UserSchema.methods={
        authenticate:function(plainText){
            return this.encryptPassword(plainText)===this.hashed_password;

        },
        encryptPassword:function(password){
            if(!password) return "";

            try{
                //encrypt password
                return  crypto
                .createHmac("sha1",this.salt)
                .update(password)
                .digest("hex");

            }
            catch(err){
                return "";

            }
        }
    };
    module.exports=mongoose.model("User",UserSchema)
