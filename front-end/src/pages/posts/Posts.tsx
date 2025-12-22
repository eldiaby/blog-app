import { useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./Posts.scss";
import Pagination from "@/components/Pagination/Pagination";
import PostList from "@/components/PostList/PostList";
import { categories, posts } from "@/dummyData";

const Posts: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="section-posts">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination />
    </>
  );
};

export default Posts;
