import React, { useContext, useEffect, useState } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { useHistory, Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { PracticePlanContext } from "../practicePlans/PracticePlansProvider";

export const ExerciseList = () => {
    const { getExercises, exercises, getExercisePlans } = useContext(ExerciseContext)
    const { getPracticePlans, practicePlans } = useContext(PracticePlanContext)
    const history = useHistory()
    // const [exercisePlans, setExercisePlans] = useState([])

    useEffect(() => {
        getExercises()
        getPracticePlans()    
    }, [])

    return (
        <>
        <h1>Exercises</h1>
        <div>
        {exercises.map(exercise => {
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
                        <div>Example: {exercise.example_picture}</div>
                    <h4>Practice Plans Exercise Is On</h4>
                    {exercisePracticePlans.map(exercisePlan => {
                        return (
                            <>
                                <div>Plan: {exercisePlan.title}</div>
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
            </>
        )})}
        </div>
        <button className="practicePlan-button" onClick={() => history.push("/exercise/create")}>Create New Exercise?</button>
        </>
    )
}