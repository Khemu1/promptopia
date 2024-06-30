import PromptCard from "@components/PromptCard";

export const Profile = ({ handleDelete, handleEdit, decs, posts, user }) => {
  console.log("Profile", posts);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{user ? `${user}` : "My Profile"}</span>
      </h1>
      <p className="desc text-left">
        {user ? `Weclome To ${user}'s Profile` : decs}
      </p>
      <div className="mt-10 prompt_layout">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={handleEdit && handleEdit}
              handleDelete={handleDelete && handleDelete}
            />
          ))
        ) : (
          <p>Loading Prompts.....</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
