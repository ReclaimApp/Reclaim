import React from 'react';
import { useSelector } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DataDisplay from '../dashboard/DataDisplay';

const CategoryRouter = () => {
  const categoryData = useSelector((state) => state.categories);

  return categoryData.map((category) => {
    const path = `/${category.path}/${category.name}`;
    console.log(path);

    return (
      <HashRouter key={uuidv4()}>
        <Route
          key={uuidv4()}
          path={path}
          render={(props) => <DataDisplay {...props} data={category.data} />}
        />
      </HashRouter>
    );
  });
};

export default CategoryRouter;
