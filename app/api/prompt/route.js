import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req, res) => {
  try {
    connectDB();
    const prompts = await Prompt.find({}).populate("userId");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
