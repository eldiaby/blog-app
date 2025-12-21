import "./PostItem.scss";

import { Link } from "react-router-dom";
import type { Props } from "./PostItem.props";

const PostItem: React.FC<Props> = ({ post }) => {
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={post.image} alt={`${post.title} blog cover`} className="post-item-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link className="post-item-username" to={`/profile/1`}>
              {" "}
              {post.author.username}
            </Link>
          </div>
          <div className="post-item-date">{new Date(post.createdAt).toDateString()}</div>
        </div>
        <div className="post-item-details">
          {/** biome-ignore lint/a11y/useHeadingContent: <explanation> */}
          <h4 className="post-item-title">{post.title}</h4>
          <Link to={`/posts/category/${post.category}`} className="post-item-category">
            {post.category}
          </Link>
        </div>
        <p className="post-item-description">
          {post.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam accusantium placeat
          aspernatur culpa quos consequuntur quod earum facere, nobis repudiandae unde iste aliquid
          quaerat commodi? Fugit aperiam voluptates earum perspiciatis! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Aperiam accusantium placeat aspernatur culpa quos
          consequuntur quod earum facere, nobis repudiandae unde iste aliquid quaerat commodi? Fugit
          aperiam voluptates earum perspiciatis! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aperiam accusantium placeat aspernatur culpa quos consequuntur quod earum facere,
          nobis repudiandae unde iste aliquid quaerat commodi? Fugit aperiam voluptates earum
          perspiciatis!
        </p>
        <Link className="post-item-link" to={`/post/details/${post._id}`}>
          See More...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
