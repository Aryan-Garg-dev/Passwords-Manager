import mongoose from "mongoose";
import crypto from 'crypto';
import 'dotenv/config';

mongoose.connect(process.env.DB_CONNECTION_URl);

const passwordSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    iv: {
        type: String,
        required: true,
    }
});

const encryptionKey = process.env.ENCRYPTION_KEY

passwordSchema.methods.encryptPassword = async function (){
    const iv = crypto.randomBytes(16);
    const keyBuffer = Buffer.from(encryptionKey, 'hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
    let encrypted = cipher.update(this.password, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    this.password = encrypted;
    this.iv = iv.toString('hex');
    return {
        iv: iv.toString('hex'),
        encryptedPassword: encrypted,
    }
}

passwordSchema.methods.decryptPassword = async function (){
    const keyBuffer = Buffer.from(encryptionKey, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, Buffer.from(this.iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(this.password, 'hex'), 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

export const Site = mongoose.model("Sites", passwordSchema);

/*

async function main(){
    try{
        const user = new Site({
            site: "github",
            email: "aryan@example.com",
            password: "agExampleSite"
        });
        await user.encryptPassword();
        const savedUser = await user.save();
    } catch(error){
        console.log(error.message);
    }
    mongoose.disconnect();
    
}

*/