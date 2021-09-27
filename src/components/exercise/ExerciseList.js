import React, { useContext, useEffect, useState } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { useHistory, Link } from "react-router-dom"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { PracticePlanContext } from "../practicePlans/PracticePlanProvider";
import { CategoryContext } from "../category/CategoryProvider"

export const ExerciseList = () => {
    const { exercises, deleteExercise, searchExercises } = useContext(ExerciseContext)
    const { practicePlans, getPracticePlans } = useContext(PracticePlanContext)
    const history = useHistory()
    const { userCategories, categories } = useContext(CategoryContext)
    const [ userDataOnly, setUserDataOnly ] = useState("")
    const [ searchTerms, setSearchTerms ] = useState("")
    const [ categoryTerms, setCategoryTerms ] = useState("")

    // Sort exercises alphabetically
    const alphabeticalExercises = exercises.sort((a, b) => {
        const textA = a.title.toUpperCase();
        const textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
    console.log(alphabeticalExercises)

    const handleUserDataOnly = () => {
        if (userDataOnly === "") {
            setUserDataOnly(true)
        } else {
            setUserDataOnly("")
        }
    }

    useEffect(() => {
        getPracticePlans()
        userCategories("")
        searchExercises(searchTerms, categoryTerms, userDataOnly)
    }, [ searchTerms, categoryTerms, userDataOnly])

    return (
        <>
        <h1>Exercises</h1>
        <h3 style={{textAlign:"center"}}>
            <label htmlFor="isUser">Current Player Data Only</label>
            <input type="checkbox" checked={userDataOnly} onChange={handleUserDataOnly} />
        </h3>
        <h3 style={{textAlign:"center"}}  className="category-dropdown-container">
            Search: <input type="text" className="search" onKeyUp={(event) => {
              setSearchTerms(event.target.value)}}
                placeholder="Search Exercises... " />
        </h3>
        <fieldset>
            <h3>Category: </h3>
                <select className="form-control-category" value={categoryTerms} name="categoryId" id="categoryId" onChange={(event) => {
                    setCategoryTerms(event.target.value)
                }}>
                    <option value="">Select Category{" "}</option>
                    {categories.map((category) => (<option key={category.id} value={category.label}>{category.label}</option>))}
				</select>
        </fieldset>
        <div className="practicePlans">
        {alphabeticalExercises?.map(exercise => {
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
                    <div className="link" color="danger" onClick={toggle}>{buttonLabel} <u><strong>{exercise.title}</strong></u></div>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>
                    <h2><u>Exercise</u></h2>
                    <h3>{exercise.title}</h3>
                        <div><strong>Player</strong></div>
                        <div>  -  {exercise.player.user.username}</div>
                        <br></br>
                        <div><strong>Plan Description</strong></div>
                        <div>  -  {exercise.description}</div>
                        <br></br>
                        <div><strong>Category</strong></div>
                        <div>  -  {exercise.category.label}</div>
                        <br></br>
                        <div style={{textAlign:"center"}}><strong>Example</strong></div>
                        <div className="exercise-picture-container">
                            {exercise.example_picture !== null ? <img className="exercise-picture" alt="exercise-example" src={exercise.example_picture}></img> : ""}
                        </div>
                    <h4>Practice Plans Exercise Is On</h4>
                    <ol>
                    {exercisePracticePlans?.map(exercisePlan => {
                        return (
                            <>
                            <li key={exercisePlan.id}><strong><Link className="link"  to={`/practiceplans/${exercisePlan.id}`}>{exercisePlan.title}</Link></strong></li>
                            <br />
                            </>
                        )
                    })}
                    </ol>
                    </ModalBody>
                    </Modal>
                </div>
                );
            }
            return (
            <>
            <div className="practicePlan">
                <div key={exercise.id}><ExerciseDetail /></div>
                {exercise.is_creator ? (
                    <>
                    <div className="practicePlan-buttons">
                <button className="btn" onClick={() => {history.push(`/exercises/edit/${exercise.id}`)}}>Edit</button>
                <button className="btn" onClick={() => {deleteExercise(exercise.id).then(history.push("/exercises"))}}>Delete</button> </div> </>) : (<> </>)
                }
                </div>
            </>
        )})}
        </div>
        <fieldset style={{textAlign:"center"}}>
        <button className="btn" onClick={() => history.push("/exercises/create")}>Create New Exercise?</button>
        </fieldset>
        </>
    )
}