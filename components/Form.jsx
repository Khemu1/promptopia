import Link from "next/link";

const Form = ({ type, post, setPost, handleSubmit, submitting }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your prompts with the world
      </p>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base ext-gray-700">
            Your AI Prompt
          </span>
          <span>
            <textarea
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              placeholder="Write your prompt here"
              required
              className="form_textarea text-semibold"
            />
          </span>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base ext-gray-700">
            Your AI Tag{" "}
            <span className="font-normal desc">(#product, #web, #idea)</span>
          </span>
          <span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="#tag"
              required
              className="form_input"
            />
          </span>
        </label>
        <div className="flex flex-end mx-3 mb-5 gap-4 flex-between">
          <button
            type="submit"
            className="bg-primary-orange rounded-full px-5 py-1.5 text-small text-white"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
          <Link href="/" className="text-gray-500 text-sm">
            Cancle
          </Link>
        </div>
      </form>
    </section>
  );
};
export default Form;
