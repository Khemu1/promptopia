import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const userPosts = await Prompt.find({ userId: params.id }).populate(
      "userId"
    );
    return new Response(JSON.stringify(userPosts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
