import "./Sidebar.scss";
import { Link } from "react-router-dom";
import type { Props } from "./Sidebar.props";

const Sidebar: React.FC<Props> = ({ categories }) => {
  return (
    <aside className="sidebar">
      <h5 className="sidebar-title">categories</h5>
      <ul className="sidebar-links">
        {categories.map((category) => (
          <li key={category._id}>
            <Link className="sidebar-link" to={`/posts/categories/${category.title}`}>
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
