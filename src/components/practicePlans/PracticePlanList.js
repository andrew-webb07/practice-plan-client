import React, { useContext, useEffect, useState } from "react"
import { useHistory, Link, useParams } from "react-router-dom"
import { PracticePlanContext } from "./PracticePlanProvider";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export const PracticePlanList = () => {
    const { getPracticePlans, practicePlans, deletePracticePlan, userPracticePlans } = useContext(PracticePlanContext)
    const history = useHistory()
    const [ userDataOnly, setUserDataOnly ] = useState("")
    const alphabeticalPracticePlans = practicePlans.sort((a, b) => {
        const textA = a.title.toUpperCase();
        const textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })

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
            {alphabeticalPracticePlans.map(practicePlan => {
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
                    <h1><u>Practice Plan</u></h1>
                    <h2>{practicePlan.title}</h2>
                    <div className="modal-text">
                        <div><strong>Player</strong></div>
                        <div>  -  {practicePlan.player.user.username}</div>
                        <br></br>
                        <div><strong>Plan Description</strong></div>
                        <div>  -  {practicePlan.description}</div>
                        <h3>Exercises</h3>
                        <ol>
                        {practicePlan.exercises.map(exercise => {
                            return (
                                <>
                                    <li><strong>{exercise.title}</strong></li>
                                    <ul>
                                    <li>  -  {exercise.description}</li>
                                    </ul>
                                    <br></br>
                                </>
                            )
                        })}
                        </ol>
                    </div>
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