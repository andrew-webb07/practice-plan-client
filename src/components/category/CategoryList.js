import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory, Link } from "react-router-dom"

export const CategoryList = () => {
    const { getCategories, categories, deleteCategory, userCategories } = useContext(CategoryContext)
    const history = useHistory()
    const [ userDataOnly, setUserDataOnly ] = useState("")

    const handleUserDataOnly = () => {
        if (userDataOnly === "") {
            setUserDataOnly(true)
        } else {
            setUserDataOnly("")
        }
    }

    useEffect(() => {
        userCategories(userDataOnly)
    }, [userDataOnly])

    return (
        <>
        <h1>Categories</h1>
        <div className="form-group">
            <label htmlFor="isUser">Current Player Data Only</label>
            <input type="checkbox"
            onChange={handleUserDataOnly} />
          </div>
        <div>
            {categories?.map(category => {
                return (
                    <>
                    <div>{category.label}</div>
                    {category.is_creator ? (
                    <>
                <button onClick={() => {history.push(`/categories/edit/${category.id}`)}}>Edit</button>
                <button onClick={() => {history.push("/categories"); deleteCategory(category.id)}}>Delete</button> </>) : (<> </>)
                }
                    </>
                )
            })}
        </div>
        </>
    )
}