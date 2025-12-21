import "./PostList.scss";

import PostItem from "./PostItem";
import type { Props } from "./PostList.Props";

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};
export default PostList;
