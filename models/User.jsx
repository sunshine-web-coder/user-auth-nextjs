// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to generate and set the slug from email before saving to the database
userSchema.pre("save", function (next) {
  // Extract the part before @ in the email and use it for the slug
  const emailParts = this.email.split("@");
  const formattedEmail = emailParts[0];
  this.slug = formattedEmail;
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
