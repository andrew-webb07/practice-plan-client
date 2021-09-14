import React, { useContext, useEffect, useState } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { useHistory, Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { PracticePlanContext } from "../practicePlans/PracticePlanProvider";
import { CategoryContext } from "../category/CategoryProvider"

export const ExerciseList = () => {
    const { getExercises, exercises, getExercisePlans, deleteExercise, searchExercises } = useContext(ExerciseContext)
    const { getPracticePlans, practicePlans } = useContext(PracticePlanContext)
    const history = useHistory()
    const { getCategories, categories } = useContext(CategoryContext)
    const [ category, setCategory ] = useState("")

    useEffect(() => {
        getExercises()
        getPracticePlans()
        searchExercises()
        getCategories()
    }, [])

    // useEffect(() => {
    //     if (category === "") {
    //         getExercises()
    //     }
    // }, [category])

    return (
        <>
        <h1>Exercises</h1>
        <div className="searchWrapper">
            Search: <input type="text" className="btn search" onKeyUp={(event) => {
              searchExercises(event.target.value)}}
                placeholder="Search Exercises... " />
        </div>
        <fieldset>
            <label htmlFor="category">Category: </label>
                <select value={category} name="categoryId" id="categoryId" onChange={(event) => {
                    searchExercises(event.target.value)
                    setCategory(event.target.value)
                }}>
                    <option value="">Select Category{" "}</option>
                    {categories.map((category) => (<option key={category.id} value={category.label}>{category.label}</option>))}
				</select>
        </fieldset>
        <div>
        {exercises?.map(exercise => {
            const ExerciseDetail = (props) => {
                const {
                buttonLabel,
                className
                } = props;

                // getExercisePlans(exercise).then((res) => {setExercisePlans(res)})
            
                const [modal, setModal] = useState(false);
            
                const toggle = () => setModal(!modal);

                let exercisePracticePlans = []

                for (const practicePlan of practicePlans) {
                    for (const practiceExercise of practicePlan.exercises) {
                        if( practiceExercise.id === exercise.id) {
                        exercisePracticePlans.push(practicePlan)
                        }
                    }
                }
  
                return (
                <div>
                    <div color="danger" onClick={toggle}>{buttonLabel} <u><strong>{exercise.title}</strong></u></div>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>
                    <h3>{exercise.title}</h3>
                        <div>Player: {exercise.player.user.username}</div>
                        <div>Description: {exercise.description}</div>
                        <div>Category: {exercise.category.label}</div>
                        <div>
                            <img src={exercise.example_picture}></img>
                        </div>
                    <h4>Practice Plans Exercise Is On</h4>
                    {exercisePracticePlans.map(exercisePlan => {
                        return (
                            <>
                            <div>
                            <strong><Link to={`/practiceplans/${exercisePlan.id}`}>{exercisePlan.title}</Link></strong>
                            </div>
                            </>
                        )
                    })}
                    </ModalBody>
                    </Modal>
                </div>
                );
            }
            return (
            <>
                <div className="exercise"><ExerciseDetail /></div>
                {exercise.is_creator ? (
                    <>
                <button onClick={() => {history.push(`/exercises/edit/${exercise.id}`)}}>Edit</button>
                <button onClick={() => {history.push("/exercises"); deleteExercise(exercise.id)}}>Delete</button> </>) : (<> </>)
                }
            </>
        )})}
        </div>
        <button className="practicePlan-button" onClick={() => history.push("/exercises/create")}>Create New Exercise?</button>
        </>
    )
}