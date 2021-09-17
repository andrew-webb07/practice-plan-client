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
            <h3 style={{textAlign:"center"}}>
            <label htmlFor="isUser">Current Player Data Only</label>
            <input type="checkbox"
            onChange={handleUserDataOnly} />
            </h3>
          <div className="practicePlans">
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
                    <div className="practicePlan">
                    <PracticePlanDetail />
                    {practicePlan.is_creator ? (
                    <>
                    <div className="practicePlan-buttons">
                    <button className="btn" onClick={() => {history.push(`/practiceplans/edit/${practicePlan.id}`)}}>Edit</button>
                    <button className="btn" onClick={() => {history.push("/"); deletePracticePlan(practicePlan.id)}}>Delete</button>
                    </div> </>) : (<> </>)
                
                }
                </div>
                </> 
                )
            })}
            </div>
            <fieldset style={{textAlign:"center"}}>
            <button className="btn" onClick={() => history.push("/practiceplans/create")}>Create New Practice Plan?</button>
            </fieldset>
            
        </>
    )
}