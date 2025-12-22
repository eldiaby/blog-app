import "./Pagination.scss";

const Pagination: React.FC = () => {
  return (
    <nav className="pagination">
      <ul>
        <li>
          <button type="button" className="page prev" disabled>
            Previous
          </button>
        </li>

        {[1, 2, 3, 4, 5].map((page) => (
          <li key={page}>
            <button type="button" className="page">
              {page}
            </button>
          </li>
        ))}

        <li>
          <button type="button" className="page next">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
