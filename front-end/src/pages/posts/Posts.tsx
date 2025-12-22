import Sidebar from "@/components/Sidebar/Sidebar";
import "./Posts.scss";
import Pagination from "@/components/Pagination/Pagination";
import PostList from "@/components/PostList/PostList";
import { categories, posts } from "@/dummyData";

const Posts: React.FC = () => {
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
