import React, { useContext, useEffect, useState } from "react"
import { PracticePlanContext } from "./PracticePlanProvider"
import { useHistory, useParams } from "react-router-dom"
import { ExerciseContext } from "../exercise/ExerciseProvider"


export const PracticePlanForm = () => {
    const {createPracticePlan, editPracticePlan, getPracticePlan} = useContext(PracticePlanContext)
    const {getExercises, exercises} = useContext(ExerciseContext)
    const [ practicePlan, setPracticePlan ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();
    const [ practicePlanExercises, setPracticePlanExercises] = useState([]);
    const {practicePlanId} = useParams()

    const handleControlledInputChange = (event) => {
        const newPracticePlan = { ...practicePlan }
        newPracticePlan[event.target.id] = event.target.value
        setPracticePlan(newPracticePlan)
    }

    const checkForm = () => {
		if (
			practicePlan.title === undefined ||
			practicePlan.description === undefined ||
			practicePlanExercises.length === 0
		) {
			return false;
		} else {
			return true;
		}
	};

    const handleSavePracticePlan = () => {
        if (checkForm() === true) {
        setIsLoading(true)
        if (practicePlanId) {
            editPracticePlan({
                id: practicePlanId,
                title: practicePlan.title,
                description: practicePlan.description,
                exercises: practicePlanExercises
            })
            .then(() => history.push("/practiceplans"))
        } else {
            createPracticePlan({
                title: practicePlan.title,
                description: practicePlan.description,
                exercises: practicePlanExercises
            })
            .then(() => history.push("/practiceplans"))
        }
        } else {
        window.alert("Please fill out all fields")
        // setIsLoading(false)
    }
    }
    
    useEffect(() => {
        getExercises()
    }, [])

    useEffect(() => {
        if (practicePlanId) {
            getPracticePlan(practicePlanId)
            .then(practicePlan => {
                setPracticePlan({
                    title: practicePlan.title,
                    description: practicePlan.description
                })
                setPracticePlanExercises(practicePlan.exercises)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [practicePlanId])

    return (
        <form id="practicePlanForm">
            <div>
                <h1>{practicePlanId ? "Edit Practice Plan" : "Create a Practice Plan"}</h1>
            <fieldset>
                <label htmlFor="title">Title: </label>
                <div>
                    <input type="text" id="title" name="title" required autoFocus placeholder="Type Title Here" value={practicePlan.title}
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description: </label>
                <div>
                    <textarea type="textarea" id="description" name="description" required autoFocus placeholder="Type Description Here" value={practicePlan.description}
                    onChange={handleControlledInputChange}></textarea>
                </div>
            </fieldset>
            <fieldset className="practicePlanExercises practicePlanFormSet">
                {exercises.map((exercise) => (
					<>
						<div className="exerciseDiv">
							<input type="checkbox" className="" key={exercise.id} value={exercise.id} onClick={() => {
											const copyPracticePlanExercises = [...practicePlanExercises];
											const idPosition = copyPracticePlanExercises.findIndex(practicePlanExercise => practicePlanExercise.id === exercise.id);
											if (idPosition >= 0) {
												copyPracticePlanExercises.splice(idPosition, 1);
											} else {
												copyPracticePlanExercises.push(exercise);
											}
											setPracticePlanExercises(copyPracticePlanExercises);
										}}
                                        checked={practicePlanExercises.some((practicePlanExercise) => {
											return practicePlanExercise.id === exercise.id;
										})}
                                        />
									<div>{exercise.title}</div>
								</div>
							</>
						))}
					</fieldset>
            <div>
                <button 
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSavePracticePlan()
                    setPracticePlan("")
                }}>{practicePlanId ? "Update Practice Plan" : "Create Practice Plan"}</button>
            </div>
            </div>
        </form>
    )
}