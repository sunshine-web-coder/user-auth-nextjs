import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    slug: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    social: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      github: {
        type: String,
      },
    },
    nationality: {
      type: String,
    },
    bio: {
      type: String,
    },
    dateOfBirth: {
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
