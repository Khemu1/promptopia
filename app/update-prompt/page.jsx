"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const handleUpdatePrompt = async (e) => {
    e.preventDefault();
    if (!promptId) {
      return alert("Prompt ID is missing !");
    }
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      const result = await response.json();
      router.push("/");
    } catch (error) {
      console.error("Failed to update prompt", error);
      alert("Failed to update prompt!");
      setSubmitting(false);
      return;
    }
  };

  useEffect(() => {
    const getPrompt = async () => {
      if (!promptId) return;
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "GET",
      });
      const result = await res.json();
      setPost({
        prompt: result.prompt,
        tag: result.tag,
      });
      setLoading(false);
    };
    getPrompt();
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      handleSubmit={handleUpdatePrompt}
      submitting={submitting}
    />
  );
};

export default UpdatePrompt;
