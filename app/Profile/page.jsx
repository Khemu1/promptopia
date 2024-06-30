"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/profile";

const MyProfile = () => {
  const [myPosts, setMyPosts] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;

      const res = await fetch(`/api/users/${session.user.id}/posts`, {
        method: "GET",
      });
      const result = await res.json();
      setMyPosts(result);
    };

    fetchProfile();
  }, [session]);

  const handleEditPrompt = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDeletePrompt = async (post) => {
    if (!session?.user?.id) {
      return alert(
        "Couldn't delete prompt. Please refresh your profile and try again."
      );
    }

    try {
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete prompt");
      }

      const updatedPosts = myPosts.filter((p) => p._id !== post._id);
      setMyPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting prompt:", error);
      alert("Failed to delete prompt. Please try again later.");
    }
  };

  return (
    <Profile
      name="My"
      decs="Welcome To Your Profile"
      posts={myPosts}
      handleDelete={handleDeletePrompt}
      handleEdit={handleEditPrompt}
    />
  );
};

export default MyProfile;
