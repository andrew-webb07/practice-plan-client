import React, { useState } from "react"

export const ExerciseContext = React.createContext()

export const ExerciseProvider = (props) => {
    const [ exercises, setExercises ] = useState([])

    // const getExercisePlans = (exercise) => {
    //     return (
	// 		fetch(`http://localhost:8000/exercises/${exercise.id}/exerciseplans`,
	// 		{
	// 			headers: {
	// 				Authorization: `Token ${localStorage.getItem("practice-plan_user_token")}`,
	// 			},
	// 		}
	// 	)).then((res) => res.json())
    // }

    const getExercises = () => {
        return fetch("http://localhost:8000/exercises", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
            .then(setExercises)
    }

    const getExercise = (exerciseId) => {
        return fetch(`http://localhost:8000/exercises/${exerciseId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
    }

    const createExercise = (exercise) => {
        return fetch("http://localhost:8000/exercises", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(exercise)
        }).then(getExercises)
    }

    const editExercise = (exercise) => {
        return fetch(`http://localhost:8000/exercises/${exercise.id}`, { 
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                "Content-Type": "application/json"               
            },
            body: JSON.stringify(exercise)
        }).then(getExercises)
    }

    const deleteExercise = (exerciseId) => {
        return fetch(`http://localhost:8000/exercises/${exerciseId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
        .then(getExercises)
    }

    return (
        <ExerciseContext.Provider value={{ exercises, getExercises, createExercise, editExercise, getExercise, deleteExercise}} >
            { props.children }
        </ExerciseContext.Provider>
    )
}