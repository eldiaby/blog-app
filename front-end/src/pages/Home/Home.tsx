import PostList from "@/components/PostList/PostList";
import "./Home.scss";

import { posts } from "@/dummyData";

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
        <aside className="post-sidebar">Sidebar</aside>
      </div>
    </section>
  );
};

export default Home;
