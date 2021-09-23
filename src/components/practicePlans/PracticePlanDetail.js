import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { PracticePlanContext } from "./PracticePlanProvider";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export const PracticePlanDetail = () => {
    const { getPracticePlan, getPracticePlans, practicePlans} = useContext(PracticePlanContext)
    const [ practicePlan, setPracticePlan ] = useState({})
    const {practicePlanId} = useParams()


    useEffect(() => {
        getPracticePlans()
        getPracticePlan(practicePlanId).then(practicePlan => {
            setPracticePlan(practicePlan)
        })    
    }, [practicePlanId])
    return (
        <>
        <div className="practicePlanDetail-container">
            <div className="practicePlanDetail">
            <h1><u>Practice Plan</u></h1>
            <h2>{practicePlan.title}</h2>
            <div className="practicePlanDetail-text">
            <div><strong>Player</strong></div>
                <div>  -  {practicePlan.player?.user.username}</div>
                <br />
                <div><strong>Plan Description</strong></div>
                <div>  -  {practicePlan.description}</div>
                <h3>Exercises</h3>
                <ol>
                {practicePlan?.exercises?.map(exercise => {
                const ExerciseDetail = (props) => {
                    const {
                    buttonLabel,
                    className
                    } = props;
            
                const [modal, setModal] = useState(false);
            
                const toggle = () => setModal(!modal);

                let exercisePracticePlans = []

                // Show all of the practice plan current exercise is on
                for (const practicePlan of practicePlans) {
                    for (const practiceExercise of practicePlan.exercises) {
                        if( practiceExercise.id === exercise.id) {
                        exercisePracticePlans.push(practicePlan)
                        }
                    }
                }
  
                return (
                <>
                    <li  className="link-practicePlan-detail" color="danger" onClick={toggle}>{buttonLabel} <u><strong>Exercise: {exercise.title}</strong></u></li>
                    <br/>
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
                        {exercise.example_picture ? <img className="exercise-picture" alt="exercise-example" src={exercise.example_picture}></img> : ""}
                        </div>
                    <h4>Practice Plans Exercise Is On</h4>
                    <ol>
                    {exercisePracticePlans.map(exercisePlan => {
                        return (
                            <>
                            <li key={exercisePlan.id}><strong><Link className="link" to={`/practiceplans/${exercisePlan.id}`}>{exercisePlan.title}</Link></strong></li>
                            <br />
                            </>
                        )
                    })}
                    </ol>
                    </ModalBody>
                    </Modal>
              </>
                );
            }
            return (
            <>
                <div className="exercise"><ExerciseDetail /></div>
            </>
        )})}
        </ol>
            </div>
            </div>
            </div>
        </>
    )
}