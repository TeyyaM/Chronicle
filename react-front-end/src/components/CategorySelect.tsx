

const CategorySelect = (props) => {
  const { searchResults } = props;
  return (
    <div className="dropdown">
    <button className="dropbtn">Categories</button>
    <div className="dropdown-content">
      <ul>
        {searchResults.map(item => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CategorySelect;