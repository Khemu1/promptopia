import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

export const Profile = ({
  handleDelete,
  handleEdit,
  decs,
  my,
  posts,
  user,
  UserDecs,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  return (
    <section className="w-full">
      {!loading && (
        <>
          <h1 className="head_text text-left">
            <span className="blue_gradient">{user ? `${user}` : my}</span>
          </h1>
          <p className="desc text-left">{user ? UserDecs : decs}</p>
        </>
      )}

      <div className="mt-10 prompt_layout">
        {loading ? (
          <p>Loading Prompts.....</p>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={handleEdit && handleEdit}
              handleDelete={handleDelete && handleDelete}
            />
          ))
        ) : (
          <p>No prompts available</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
