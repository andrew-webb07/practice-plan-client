import React, { useContext, useEffect, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { SessionContext } from "./SessionProvider.js"
import { useHistory, Link } from "react-router-dom"
import Practice_Plan_NO_BORDER_02 from "../images/Practice_Plan_NO_BORDER_02.png"
import "./Session.css"

export const SessionList = () => {
    const { sessions, getSessions, deleteSession } = useContext(SessionContext)
    const history = useHistory()
    const today = new Date()
    today.setDate(today.getDate() - 1)
    const completedSessions = sessions.filter(session => Date.parse(session.date) < today)
    const scheduledSessions = sessions.filter(session => Date.parse(session.date) >= today)

    useEffect(() => {
        getSessions()       
    }, [])

    return (
        <>
        <div className="logoContainer">
            <img src={Practice_Plan_NO_BORDER_02} alt="logo" className="logo" />
        </div>
        <div className="practicePlan-buttons">
            <button className="practicePlan-button" onClick={() => history.push("/sessions/create")}>Schedule Session?</button>
            <button className="practicePlan-button" onClick={() => history.push("/practiceplans/create")}>Create Practice Plan?</button>
            <button className="practicePlan-button" onClick={() => history.push("/exercises/create")}>Create Practice Exercise?</button>
        </div>
            <h1>Scheduled Sessions</h1>
        <div className="sessions">
        {scheduledSessions.map(session => {
            const PracticePlanDetail = (props) => {
                const {
                buttonLabel,
                className
                } = props;
            
                const [modal, setModal] = useState(false);
            
                const toggle = () => setModal(!modal);
  
                return (
                <div>
                    <div color="danger" onClick={toggle}>{buttonLabel} <u><strong>{session.practice_plan.title}</strong></u></div>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>
                    <h1><u>Practice Plan</u></h1>
                    <h2>{session.practice_plan.title}</h2>
                    <div className="modal-text">
                        <div><strong>Player</strong></div>
                        <div>  -  {session.player.user.username}</div>
                        <br></br>
                        <div><strong>Plan Description</strong></div>
                        <div>  -  {session.practice_plan.description}</div>
                        <h3>Exercises</h3>
                        <ol>
                        {session.practice_plan.exercises.map(exercise => {
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
            <div className="session">
            <PracticePlanDetail />
            <div>{session.date} {session.length_of_session} minutes</div>
            <div>Length of Each Exercise: {session.length_of_each_exercise} minutes</div>
            <div>Notes: {session.notes}</div>
            <div className="session-buttons">
            <button className="btn" onClick={() => {history.push(`/sessions/edit/${session.id}`)}}>Edit</button>
            <button className="btn" onClick={() => {history.push("/"); deleteSession(session.id)}}>Delete</button>
            </div>
            </div>
            </>
        )})}
        </div>
            <h1>Completed Sessions</h1>
            <div className="sessions">
            {completedSessions.map(session => {
                const PracticePlanDetail = (props) => {
                    const {
                    buttonLabel,
                    className
                    } = props;
                
                    const [modal, setModal] = useState(false);
                
                    const toggle = () => setModal(!modal);
      
                    return (
                    <div>
                        <div color="danger" onClick={toggle}>{buttonLabel} <u><strong>{session.practice_plan.title}</strong></u></div>
                        <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}></ModalHeader>
                        <ModalBody>
                        <h1><u>Practice Plan</u></h1>
                    <h2>{session.practice_plan.title}</h2>
                    <div className="modal-text">
                        <div><strong>Player</strong></div>
                        <div>  -  {session.player.user.username}</div>
                        <br></br>
                        <div><strong>Plan Description</strong></div>
                        <div>  -  {session.practice_plan.description}</div>
                        <h3>Exercises</h3>
                        <ol>
                        {session.practice_plan.exercises.map(exercise => {
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
            <div className="session">
            <PracticePlanDetail />
            <div>{session.date} {session.length_of_session} minutes</div>
            <div>Length of Each Exercise: {session.length_of_each_exercise} minutes</div>
            <div>Notes: {session.notes}</div>
            <div className="session-buttons">
            <button className="btn" onClick={() => {history.push(`/sessions/edit/${session.id}`)}}>Edit</button>
            <button className="btn" onClick={() => {history.push("/"); deleteSession(session.id)}}>Delete</button>
            </div>
            </div>
            </>
        )})}
        </div>
        <fieldset style={{textAlign:"center"}}>
        <button className="btn-to-form" onClick={() => history.push("/sessions/create")}>Schedule Session?</button>
        </fieldset>
        </>
    )
}