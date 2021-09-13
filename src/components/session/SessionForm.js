import React, { useContext, useEffect, useState } from "react"
import { SessionContext } from "./SessionProvider"
import { useHistory, useParams } from "react-router-dom"
import { ExerciseContext } from "../exercise/ExerciseProvider"
import { PracticePlanContext } from "../practicePlans/PracticePlanProvider"


export const SessionForm = () => {
    const {createSession, editSession, getSession} = useContext(SessionContext)
    const {getPracticePlans, practicePlans} = useContext(PracticePlanContext)
    const [ session, setSession ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();
    const [ sessionPracticePlan, setSessionPracticePlan] = useState({
        id: null,
        player: "",
        title: "",
        description: "",
        exercises: []
    });
    const {sessionId} = useParams()

    const handleControlledInputChange = (event) => {
        const newSession = { ...session }
        newSession[event.target.id] = event.target.value
        setSession(newSession)
    }

    useEffect(() => {
        getPracticePlans()       
    }, [])

    const handleSaveSession = () => {
        if (sessionPracticePlan === undefined ||
            session.lengthOfSession === undefined ||
            session.date === undefined ||
            session.notes === undefined){
                window.alert("Please fill out all fields")
            } else if (Number.isInteger(parseInt(session.lengthOfSession)) === false ) {
                window.alert("Please enter a number only in session length field")
            } else {
        setIsLoading(true)
        if (sessionId) {
            editSession({
                id: sessionId,
                practicePlanId: sessionPracticePlan.id,
                lengthOfSession: parseInt(session.lengthOfSession),
                date: session.date,
                notes: session.notes
            })
            .then(() => history.push("/"))
        } else {
            createSession({
                practicePlanId: sessionPracticePlan.id,
                lengthOfSession: parseInt(session.lengthOfSession),
                date: session.date,
                notes: session.notes
            })
            .then(() => history.push("/"))
        }}
    }

    useEffect(() => {
        if (sessionId) {
            getSession(sessionId)
            .then(session => {
                setSession({
                    lengthOfSession: session.length_of_session,
                    date: session.date,
                    notes: session.notes
                })
                setSessionPracticePlan(session.practice_plan)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [sessionId])

    return (
        <form id="sessionForm">
            <div>
                <h1>{sessionId ? "Edit Session" : "Schedule a Session"}</h1>
            <fieldset>
                <label htmlFor="practicePlan">Practice Plan</label>
                <div>
                    {practicePlans?.map(practicePlan => (
                        <>
                        <div>
                            <input type="radio" id="practicePlan" name="practicePlan" value={practicePlan.id} onChange={() => setSessionPracticePlan(practicePlan)} checked={sessionPracticePlan.id === practicePlan.id} />
                            <label htmlFor="practicePlan">{practicePlan.title}</label>
                        </div>
                        </>
                    ))}
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="practicePlanDetails">Practice Plan Details: </label>
                <div>Title: {sessionPracticePlan.title}</div>
                <div>Description: {sessionPracticePlan.description}</div>
                {sessionPracticePlan.exercises.map(exercise => (
                    <>
                        <div>
                            <div>Exercise Title: {exercise.title}</div>
                            <div>Exercise Description: {exercise.description}</div>
                            <div>Category: {exercise.category.label}</div>
                        </div>
                    </>
                    ))}
            </fieldset>
            <fieldset>
                <label htmlFor="title">Length of Session in minutes: </label>
                <div>
                    <input type="text" id="lengthOfSession" name="lengthOfSession" required autoFocus placeholder="Type number (e.g. '10')" value={session.lengthOfSession}
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="date">Schedule: </label>
                <input type="date" id="date" name="date" required autoFocus className="form-control"
                placeholder="Date"
                onChange={handleControlledInputChange}
                value={session.date}/>
            </div>
          </fieldset>
          <fieldset>
                <label htmlFor="notes">Session Notes: </label>
                <div>
                    <textarea type="textarea" id="notes" name="notes" required autoFocus placeholder="Type Description Here" value={session.notes}
                    onChange={handleControlledInputChange}></textarea>
                </div>
            </fieldset>
            <div>
                <button 
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveSession()
                    setSession("")
                }}>{sessionId ? "Update Practice Plan" : "Create Practice Plan"}</button>
            </div>
            </div>
        </form>
    )
}