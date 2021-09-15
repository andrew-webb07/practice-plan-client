import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [ categories, setCategories ] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const userCategories = (isUser) => {
        return fetch(`http://localhost:8000/categories?isUser=${isUser}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
        .then(res => res.json())
        .then(setCategories)
    }

    const getCategory = (categoryId) => {
        return fetch(`http://localhost:8000/categories/${categoryId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
    }

    const createCategory = (category) => {
        return fetch("http://localhost:8000/categories", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(category)
        }).then(getCategories)
    }

    const editCategory = (category) => {
        return fetch(`http://localhost:8000/categories/${category.id}`, { 
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                "Content-Type": "application/json"               
            },
            body: JSON.stringify(category)
        }).then(getCategories)
    }

    const deleteCategory = (categoryId) => {
        return fetch(`http://localhost:8000/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
        .then(getCategories)
    }

    return (
        <CategoryContext.Provider value={{ categories, getCategories, createCategory, editCategory, getCategory, deleteCategory, userCategories}} >
            { props.children }
        </CategoryContext.Provider>
    )
}