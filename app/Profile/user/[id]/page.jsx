"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Profile from "@components/profile";

const UserProfile = () => {
  const [userPosts, setUserPosts] = useState(null);
  const [username, setUsername] = useState(null);
  const router = useRouter();
  const params = useParams();
  console.log("user id ", params.id);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`, {
        method: "GET",
      });
      const result = await res.json();
      setUsername(result[0].userId.username);
      setUserPosts(result);
    };

    fetchProfile();
  }, []);

  return (
    <Profile user={username} decs="Welcome To Your Profile" posts={userPosts} />
  );
};

export default UserProfile;
