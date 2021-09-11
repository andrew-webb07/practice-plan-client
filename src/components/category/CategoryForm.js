import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory } from "react-router-dom"


export const CategoryForm = () => {
    const {createCategory} = useContext(CategoryContext)

    const [ category, setCategory ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category }
        newCategory[event.target.id] = event.target.value
        setCategory(newCategory)
    }

    const handleSaveCategory = () => {
        setIsLoading(true)
        createCategory({
            label: category.label
        })
        .then(() => clearForm() , history.push("/categories"))
    }
    
    const clearForm = () => { 
        document.getElementById("categoryForm").reset();
      }

    useEffect(() => {
        setIsLoading(false)
    }, [category])

    return (
        <form id="categoryForm">
            <div>
            <fieldset className="postFormSet">
                <div>
                    <input type="text" id="label" name="label" required autoFocus placeholder="Type Category Here"
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
                }}>Create Category</button>
            </div>
            </div>
        </form>
    )
}