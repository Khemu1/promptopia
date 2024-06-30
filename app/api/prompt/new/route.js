import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req) => {
  const { prompt, tag, userId } = await req.json();
  try {
    await connectDB();
    const newPrompt = new Prompt({
      userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("Faild while creating prompt", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
