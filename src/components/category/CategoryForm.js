import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory, useParams } from "react-router-dom"


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
    
    const clearForm = () => { 
        document.getElementById("categoryForm").reset();
      }

    useEffect(() => {
        setIsLoading(false)
    }, [category])

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
    }, [categoryId])

    return (
        <form id="categoryForm">
            <div>
                <h1>{categoryId ? "Edit Category": "Create a Category"}</h1>
            <fieldset>
                <div>
                    <input type="text" id="label" name="label" value={category.label} required autoFocus placeholder="Type Category Here"
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <div>
                <button 
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveCategory()
                    setCategory("")
                }}>{categoryId ? "Update Category": "Create Category"}</button>
            </div>
            </div>
        </form>
    )
}