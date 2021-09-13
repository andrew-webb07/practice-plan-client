import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory, Link } from "react-router-dom"

export const CategoryList = () => {
    const { getCategories, categories, deleteCategory } = useContext(CategoryContext)
    const history = useHistory()

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
        <h1>Categories</h1>
        <div>
            {categories.map(category => {
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