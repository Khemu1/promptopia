"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          type={"user"}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {};
  const handleTagClick = (e) => {};
  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      console.log(data);
      setData(data);
    };
    fetchPrompts();
  }, []);
  return (
    <section className="feed flex flex-col">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search_input "
        />
      </form>
      <PromptList data={data} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
