import "./Home.scss";
import PostList from "@/components/PostList/PostList";

import Sidebar from "@/components/Sidebar/Sidebar";
import { categories, posts } from "@/dummyData";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <section className="section__home">
      <div className="home__hero__header">
        <div className="home__hero__header__layout">
          <h1 className="home__hero__header__layout__title">Welcome to my home Blogging</h1>
        </div>
      </div>
      <div className="home__latest-post">Latest posts</div>home-container
      <div className="home__container">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </div>
      <div className="home-see-posts-link">
        <Link to={`/posts`} className="home-link">
          See all posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
