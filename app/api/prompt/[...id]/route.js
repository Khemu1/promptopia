import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    console.log(params);
    await connectDB();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const _id = await params.id;
  console.log(_id);
  try {
    await connectDB();

    await Prompt.deleteOne({ _id: _id });

    return new Response({ status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { prompt, tag } = await req.json();
    console.log(prompt, tag, params.id);
    await connectDB();
    const findPrompt = await Prompt.findById(params.id);
    if (!findPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    findPrompt.prompt = prompt;
    findPrompt.tag = tag;
    findPrompt.save();

    return new Response(JSON.stringify(findPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
