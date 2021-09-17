import React, { useContext, useEffect, useState } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { useHistory, useParams } from "react-router-dom"
import { CategoryContext } from "../category/CategoryProvider"
import "./Exercise.css"


export const ExerciseForm = () => {
    const {createExercise, editExercise, deleteExercise, getExercise} = useContext(ExerciseContext)
    const { getCategories, categories } = useContext(CategoryContext)

    const [ exercise, setExercise ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();
    const [currentPicture, setCurrentPicture] = useState("");
    const {exerciseId} = useParams()

    const getBase64 = (file, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(file);
	};

	const createExerciseImageString = (event) => {
		getBase64(event.target.files[0], (base64ImageString) => {
			setCurrentPicture(base64ImageString);
		});
	};

    useEffect(() => {
        getCategories()
    }, [])

    const handleControlledInputChange = (event) => {
        const newExercise = { ...exercise }
        newExercise[event.target.id] = event.target.value
        setExercise(newExercise)
    }

    const handleSaveExercise = () => {
        if (exercise.title === undefined ||
            exercise.description === undefined ||
            exercise.categoryId === undefined || exercise.title === "" ||
            exercise.description === "" ||
            exercise.categoryId === "") {
            window.alert("Please fill out all fields")
            } else {
        setIsLoading(true)
        if (exerciseId) {
            editExercise({
                id: exerciseId,
                title: exercise.title,
                description: exercise.description,
                categoryId: parseInt(exercise.categoryId),
                examplePicture: currentPicture
            })
            .then(() => history.push("/exercises"))
        } else {
        createExercise({
            title: exercise.title,
            description: exercise.description,
            categoryId: parseInt(exercise.categoryId),
            examplePicture: currentPicture
        })
        .then(() => history.push("/exercises"))
    }}
    }

    useEffect(() => {
        if (exerciseId) {
            getExercise(exerciseId)
            .then(exercise => {
                setExercise({
                    title: exercise.title,
                    description: exercise.description,
                    categoryId: parseInt(exercise.category.id)
                })
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [exerciseId])

    return (
        <>
        <div className="category-container">
        <form className="form--exercise" id="exerciseForm">
            <div>
                <h1>{exerciseId ? "Edit an Exercise" : "Create an Exercise"}</h1>
            <fieldset >
                <div className="category-dropdown-container">
                <label htmlFor="category">Category: </label>
                <select className="form-control-category" value={exercise.categoryId} name="categoryId" id="categoryId" onChange={handleControlledInputChange}>
                    <option value="0">Select Category{" "}</option>
                    {categories.map((category) => (<option key={category.id} value={category.id}>{category.label}</option>))}
				</select>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="title">Title: </label>
                <div>
                    <input className="form-control" type="text" id="title" name="title" value={exercise.title} required autoFocus placeholder="Type Title Here"
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description: </label>
                <div>
                    <textarea className="form-control" type="textarea" id="description" name="description" value={exercise.description} required autoFocus placeholder="Type Description Here"
                    onChange={handleControlledInputChange}></textarea>
                </div>
            </fieldset>
            <fieldset >
                <div className="picture-form-container">
                <label htmlFor="examplePicture">Example of Exercise: </label>
				<input type="file" id="examplePicture" onChange={createExerciseImageString}/>
                </div>
			</fieldset >
            <fieldset style={{textAlign:"center"}}>
                <button className="btn btn-1 btn-sep icon-send" disabled={isLoading} onClick={event => {
                    event.preventDefault()
                    handleSaveExercise()
                    setExercise("")
                }}>{exerciseId ? "Update Exercise" : "Create Exercise"}</button>
            </fieldset>
            </div>
        </form>
        </div>
        </>
    )
}