import React, { useContext, useEffect, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { SessionContext } from "./SessionProvider.js"
import { useHistory, Link } from "react-router-dom"
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
        <h1 className="header">Practice Plan</h1>
        <div className="practicePlan-buttons">
            <button className="practicePlan-button" onClick={() => history.push("/sessions/create")}>Schedule Session?</button>
            <button className="practicePlan-button" onClick={() => history.push("/practiceplans/create")}>Create Practice Plan?</button>
            <button className="practicePlan-button" onClick={() => history.push("/exercises/create")}>Create Practice Exercise?</button>
        </div>
        <div className="sessions">
            <h2>Scheduled Sessions</h2>
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
                    <h3>{session.practice_plan.title}</h3>
                        <div>Player: {session.player.user.username}</div>
                        <div>Plan Description: {session.practice_plan.description}</div>
                        <h4>Exercises</h4>
                        {session.practice_plan.exercises.map(exercise => {
                            return (
                                <>
                                    <div>{exercise.title}</div>
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
            <div>{session.date} {session.length_of_session} minutes</div>
            <div>Length of Each Exercise: {session.length_of_each_exercise} minutes</div>
            <div>Notes: {session.notes}</div>
            <button onClick={() => {history.push(`/sessions/edit/${session.id}`)}}>Edit</button>
            <button onClick={() => {history.push("/"); deleteSession(session.id)}}>Delete</button>
            </>
        )})}
        </div>
        <div className="sessions">
            <h2>Completed Sessions</h2>
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
                        <h3>{session.practice_plan.title}</h3>
                            <div>Player: {session.player.user.username}</div>
                            <div>Plan Description: {session.practice_plan.description}</div>
                            <h4>Exercises</h4>
                            {session.practice_plan.exercises.map(exercise => {
                                return (
                                    <>
                                        <div>{exercise.title}</div>
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
            <div>{session.date} {session.length_of_session} minutes</div>
            <div>Length of Each Exercise: {session.length_of_each_exercise} minutes</div>
            <div>{session.notes}</div>
            <button onClick={() => {history.push(`/sessions/edit/${session.id}`)}}>Edit</button>
            <button onClick={() => {history.push("/"); deleteSession(session.id)}}>Delete</button>
            </>
        )})}
        <div>
        <button className="practicePlan-button" onClick={() => history.push("/sessions/create")}>Schedule Session?</button>
        </div>
        </div>
        </>
    )
}