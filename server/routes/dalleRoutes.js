import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai"


dotenv.config();

const router =express.Router();

const openai= new OpenAI({
    api_key: process.env.OPENAI_API_KEY
  })

router.route('/').get((req,res)=>{
    res.send("hello from dall e route")
})

router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const aiResponse = await openai.images.generate({
        model: "dall-e-2",
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
    });

    const image = aiResponse.data[0].b64_json
      res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
    //   console.log("Avatar error status: ", error.response.status);
// console.log("Avatar error data: ", error.response.data);
      res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
  });
  

export default router;