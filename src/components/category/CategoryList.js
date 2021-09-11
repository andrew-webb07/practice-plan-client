import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"

export const CategoryList = () => {
    const { getCategories, categories } = useContext(CategoryContext)

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
                    </>
                )
            })}
        </div>
        </>
    )
}