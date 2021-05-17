
const CategoryItem = (props) => {
  const { name, id, setCategory} = props;
  console.log(name, id, setCategory);
  return (
    <li>
        hello it's me
    </li>
  );
};

export default CategoryItem;