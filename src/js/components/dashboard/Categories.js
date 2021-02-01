import React from "react"
import parse from 'html-react-parser';
import { useSelector } from "react-redux";


const Categories = (props) => {
    const data = useSelector(state => state.index)

    const options = {
      replace: (domNode) => {
        if (!domNode.attribs) {
          return
        }
        if (domNode.attribs.href) {
          return (
            <a href={domNode.attribs.href} onClick={(e) => {
              e.preventDefault()
              props.history.push(domNode.attribs.href)
            }} style={{cursor: "pointer"}}>{domNode.children[0].data}</a>
          )
          }
        }
      }

    

    return (
      parse(data, options)
    )
}

export default Categories;