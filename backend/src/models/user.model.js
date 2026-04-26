import mongoose from "mongoose";
import bcrypt from "bcryptjs";   // ✅ FIX

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: "https://ik.imagekit.io/Avinash/youtube/default-avatar.png"
    },

    fullname: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },

    googleId: {
        type: String
    },

    otp: String,
    otpExpiry: Date,

    isVerified: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });  

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
})


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const userModel =mongoose.model("user",userSchema);

export default userModel;