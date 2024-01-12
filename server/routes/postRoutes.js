import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import postSchema from "../mongodb/models/postSchema.js";

dotenv.config();

const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const posts = await postSchema.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// [SO THAT I CAN SUBMIT MY POST THE DATA I AM GETTING FROM THE FRONTEND] think of this postroute.js as iske is is part ko different jagah call krwao to get the desired outputs
router.route('/').post(async (req, res) => {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo,{ public_id: `${Date.now()}`, resource_type: "auto" });
  
      const newPost = await postSchema.create({
        name,
        prompt,
        photo: photoUrl.url,
      });
  
      res.status(200).json({ success: true, data: newPost });
    } catch (err) {
        console.log(err)
      res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
  });
  
  
export default router;
