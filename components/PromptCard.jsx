"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
export const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  type,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [copy, setCopy] = useState("");

  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justy-between gap-5">
        <div className="flex-1 flex justify-start gap-x-2 items-center cursor-pointer">
          {type ? (
            <Link href={`Profile/user/${post.userId._id}`}>
              <Image
                src={post.userId.image}
                width={30}
                height={30}
                className="rounded-full object-contain"
                alt="profile"
              />
            </Link>
          ) : (
            <Image
              src={post.userId.image}
              width={30}
              height={30}
              className="rounded-full object-contain"
              alt="profile"
            />
          )}

          <div className="flex flex-col">
            <h3 className="font-satohsi font-semibold text-gray-900">
              {post.userId.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.userId.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>
      <p className="my-4 font-satohsi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {handleEdit && handleDelete && (
        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="black_btn"
            onClick={() => handleEdit(post)}
          >
            Edit
          </button>
          <button
            type="button"
            className="font-inter text-sm text-gray-800"
            onClick={() => handleDelete(post)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
