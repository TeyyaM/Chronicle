import CategoryItem from './CategoryItem';

const CategorySelect = (props) => {
  const { searchResults, setCategoryId, categoryId } = props;
  return (
    <div className="dropdown">
    <button className="dropbtn">Categories</button>
    <div className="dropdown-content">
      <ul>
        {searchResults.map(category => (
          <CategoryItem name={category.name}
          id={category.id}
          categoryId={categoryId}
          setCategoryId={setCategoryId} />
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CategorySelect;