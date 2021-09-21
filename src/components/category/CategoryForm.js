import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Category.css"

export const CategoryForm = () => {
    const {createCategory, editCategory, getCategory} = useContext(CategoryContext)
    const [ category, setCategory ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();
    const {categoryId} = useParams()

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category }
        newCategory[event.target.id] = event.target.value
        setCategory(newCategory)
    }

    const handleSaveCategory = () => {
        if (category.label === undefined || category.label === "") {
            window.alert("Please enter a category")
        } else {
        setIsLoading(true)
        if (categoryId) {
            editCategory({
                id: categoryId,
                label: category.label
            })
            .then(() => clearForm(), history.push("/categories"))
        } else {
            createCategory({
                label: category.label
            })
            .then(() => clearForm() , history.push("/categories"))
        }
    }
    }
    
    // Reset form when user creates new category
    const clearForm = () => { 
        document.getElementById("categoryForm").reset();
      }

    useEffect(() => {
        setIsLoading(false)
    }, [category])

    // get label for category being edited
    useEffect(() => {
        if (categoryId) {
            getCategory(categoryId)
            .then(category => {
                setCategory({
                    label: category.label,
                   })
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [categoryId, getCategory])

    return (
        <>
        <div className="category-container">
        <form className="form--category" id="categoryForm">
            <div>
                <h1>{categoryId ? "Edit Category": "Create a Category"}</h1>
            <fieldset>
                    <input className="form-control" type="text" id="label" name="label" value={category.label} required autoFocus placeholder="Type Category Here"
                    onChange={handleControlledInputChange}/>
            </fieldset>
            <fieldset style={{textAlign:"center"}}>
                <button disabled={isLoading} className="btn btn-1 btn-sep icon-send" onClick={event => {
                    event.preventDefault()
                    handleSaveCategory()
                    setCategory("")
                }}>{categoryId ? "Update Category": "Create Category"}</button>
            </fieldset>
            </div>
        </form>
        </div>
        </>
    )
}