import React, { useContext, useEffect, useState } from "react"
import { useHistory, Link, useParams } from "react-router-dom"
import { PracticePlanContext } from "../practicePlans/PracticePlansProvider";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export const PracticePlanList = () => {
    const { getPracticePlans, practicePlans } = useContext(PracticePlanContext)
    const history = useHistory()

    useEffect(() => {
        getPracticePlans()       
    }, [])

    return (
        <>
            <h1>Practice Plans</h1>
            {practicePlans.map(practicePlan => {
                const PracticePlanDetail = (props) => {
                    const {
                    buttonLabel,
                    className
                    } = props;
                
                    const [modal, setModal] = useState(false);
                
                    const toggle = () => setModal(!modal);
      
                    return (
                    <div>
                        <div color="danger" onClick={toggle}>{buttonLabel} <u><strong>{practicePlan.title}</strong></u></div>
                        <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}></ModalHeader>
                        <ModalBody>
                        <h3>{practicePlan.title}</h3>
                            <div>Player: {practicePlan.player.user.username}</div>
                            <div>Plan Description: {practicePlan.description}</div>
                            <h4>Exercises</h4>
                            {practicePlan.exercises.map(exercise => {
                                return (
                                    <>
                                        <div><strong>{exercise.title}</strong></div>
                                        <div>{exercise.description}</div>
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
                    <PracticePlanDetail />
                    </>
                )
            })}
            <div>
            <button className="practicePlan-button" onClick={() => history.push("/practiceplan/create")}>Create New Practice Plan?</button>
            </div>
        </>
    )
}