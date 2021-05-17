import CategoryItem from './CategoryItem';

const CategorySelect = (props) => {
  const { searchResults, setCategory } = props;
  return (
    <div className="dropdown">
    <button className="dropbtn">Categories</button>
    <div className="dropdown-content">
      <ul>
        {searchResults.map(category => (
          <CategoryItem name={category.name} id={category.id} setCategory={setCategory} />
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CategorySelect;