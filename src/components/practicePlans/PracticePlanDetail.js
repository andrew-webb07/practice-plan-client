import React, { useContext, useEffect, useState } from "react"
import { useHistory, Link, useParams } from "react-router-dom"
import { PracticePlanContext } from "../practicePlans/PracticePlansProvider";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export const PracticePlanDetail = () => {
    const { getPracticePlan, getPracticePlans, practicePlans} = useContext(PracticePlanContext)
    const [ practicePlan, setPracticePlan ] = useState({})
    const history = useHistory()
    const {practicePlanId} = useParams()


    useEffect(() => {
        getPracticePlans()
        getPracticePlan(practicePlanId).then(practicePlan => {
            setPracticePlan(practicePlan)
        })    
    }, [practicePlanId])
    return (
        <>
            <h1>Practice Plan Detail</h1>
            <div>
                <div>User: {practicePlan.player?.user.username}</div>
                <div>Plan: {practicePlan.title}</div>
                <div>{practicePlan.description}</div>
                {practicePlan?.exercises?.map(exercise => {
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
                    <div color="danger" onClick={toggle}>{buttonLabel} <u><strong>Exercise: {exercise.title}</strong></u></div>
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
            </>
        )})}
            </div>
        </>
    )
}