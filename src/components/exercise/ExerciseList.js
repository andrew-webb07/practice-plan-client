import React, { useContext, useEffect, useState } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { useHistory, Link } from "react-router-dom"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { PracticePlanContext } from "../practicePlans/PracticePlanProvider";
import { CategoryContext } from "../category/CategoryProvider"

export const ExerciseList = () => {
    const { getExercises, exercises, deleteExercise, searchExercises } = useContext(ExerciseContext)
    const { getPracticePlans, practicePlans } = useContext(PracticePlanContext)
    const history = useHistory()
    const { getCategories, categories } = useContext(CategoryContext)
    const [ userDataOnly, setUserDataOnly ] = useState("")
    const [ searchTerms, setSearchTerms ] = useState("")
    const [ categoryTerms, setCategoryTerms ] = useState("")
    // const [ category, setCategory ] = useState("")
    // const [ allExercises, setAllExercises ] = useState([])

    const handleUserDataOnly = () => {
        if (userDataOnly === "") {
            setUserDataOnly(true)
        } else {
            setUserDataOnly("")
        }
    }



    useEffect(() => {
        // getExercises()
        // .then(setAllExercises)
        getPracticePlans()
        getCategories()
    }, [])

    useEffect(() => {
        searchExercises(searchTerms, categoryTerms, userDataOnly)
    }, [ searchTerms, categoryTerms, userDataOnly])

    return (
        <>
        <h1>Exercises</h1>
        <div className="form-group">
            <label htmlFor="isUser">Current Player Data Only</label>
            <input type="checkbox" checked={userDataOnly} onChange={handleUserDataOnly} />
          </div>
        <div className="searchWrapper">
            Search: <input type="text" className="btn search" onKeyUp={(event) => {
              setSearchTerms(event.target.value)}}
                placeholder="Search Exercises... " />
        </div>
        <fieldset>
            <label htmlFor="category">Category: </label>
                <select value={categoryTerms} name="categoryId" id="categoryId" onChange={(event) => {
                    setCategoryTerms(event.target.value)
                    // setCategory(event.target.value)
                }}>
                    <option value="">Select Category{" "}</option>
                    {categories.map((category) => (<option key={category.id} value={category.label}>{category.label}</option>))}
				</select>
        </fieldset>
        <div>
        {exercises?.map(exercise => {
            const ExerciseDetail = (props) => {
                const {buttonLabel, className} = props;
            
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
                <div key={exercise.id}>
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
                            <div key={exercisePlan.id}>
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
                <div className="exercise" key={exercise.id}><ExerciseDetail /></div>
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