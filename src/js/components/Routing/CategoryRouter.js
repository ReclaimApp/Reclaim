import React from "react"
import DataDisplay from "../dashboard/DataDisplay"
import {useSelector} from "react-redux"
import {Route, HashRouter} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

const CategoryRouter = () => {
    const categoryData = useSelector(state => state.categories)


    return(
        categoryData.map((category) => {
            const path = "/" + category.path + "/" + category.name
            console.log(path)
            return(
                <HashRouter>
                    <Route key={uuidv4()} path={path} render={(props) => <DataDisplay {...props} data={category.data} />} />
                </HashRouter>
            ) 
        })
    )
}

export default CategoryRouter;