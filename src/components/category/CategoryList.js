import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory } from "react-router-dom"
import "./Category.css"

export const CategoryList = () => {
    const { categories, deleteCategory, userCategories } = useContext(CategoryContext)
    const history = useHistory()
    const [ userDataOnly, setUserDataOnly ] = useState("")

    // Sort categories alphabetically
    const alphabeticalCategories = categories.sort((a, b) => {
        const textA = a.label.toUpperCase();
        const textB = b.label.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
    console.log(alphabeticalCategories)

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
        <h3 style={{textAlign:"center"}}>
            <label htmlFor="isUser">Current Player Data Only</label>
            <input type="checkbox" checked={userDataOnly} onChange={handleUserDataOnly} />
        </h3>
        <div className="practicePlans">
            {alphabeticalCategories?.map(category => {
                return (
                    <>
                    <div className="practicePlan">
                    <div style={{textAlign:"center"}}>{category.label}</div>
                    {category.is_creator ? (
                    <>
                    <div className="practicePlan-buttons">
                        <button className="btn" onClick={() => {history.push(`/categories/edit/${category.id}`)}}>Edit</button>
                        <button className="btn" onClick={() => {history.push("/categories"); deleteCategory(category.id)}}>Delete</button> </div> </>) : (<> </>)
                }
                </div>
                    </>
                )
            })}
        </div>
        </>
    )
}