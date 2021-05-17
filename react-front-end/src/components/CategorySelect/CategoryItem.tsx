import { useEffect } from 'react';

const CategoryItem = (props) => {
  const { name, id, setCategoryId, categoryId} = props;

  const changeCategory = () => {
    categoryId !== id 
    ? setCategoryId(id)
    : setCategoryId(null);
    
    console.log('I\'m the category id!!!!', categoryId);
  }
   
  useEffect (() => {
    
  }, [categoryId])
  return (
    <li>
      <button onClick={changeCategory}>{name}</button>
    </li>
  );
};

export default CategoryItem;