import React, { useContext, useEffect, useState } from "react"
import { useHistory, Link, useParams } from "react-router-dom"
import { PracticePlanContext } from "./PracticePlanProvider";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export const PracticePlanList = () => {
    const { getPracticePlans, practicePlans, deletePracticePlan, userPracticePlans } = useContext(PracticePlanContext)
    const history = useHistory()
    const [ userDataOnly, setUserDataOnly ] = useState("")

    const handleUserDataOnly = () => {
        if (userDataOnly === "") {
            setUserDataOnly(true)
        } else {
            setUserDataOnly("")
        }
    }

    useEffect(() => {
        userPracticePlans(userDataOnly)
    }, [userDataOnly])

    return (
        <>
            <h1>Practice Plans</h1>
            <div className="form-group">
            <label htmlFor="isUser">Current Player Data Only</label>
            <input type="checkbox"
            onChange={handleUserDataOnly} />
          </div>
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
                    {practicePlan.is_creator ? (
                    <>
                <button onClick={() => {history.push(`/practiceplans/edit/${practicePlan.id}`)}}>Edit</button>
                <button onClick={() => {history.push("/"); deletePracticePlan(practicePlan.id)}}>Delete</button> </>) : (<> </>)
                }
                    </>
                )
            })}
            <div>
            <button className="practicePlan-button" onClick={() => history.push("/practiceplans/create")}>Create New Practice Plan?</button>
            </div>
        </>
    )
}