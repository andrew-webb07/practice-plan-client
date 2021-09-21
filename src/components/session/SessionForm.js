import React, { useContext, useEffect, useState } from "react"
import { SessionContext } from "./SessionProvider"
import { useHistory, useParams } from "react-router-dom"
import { PracticePlanContext } from "../practicePlans/PracticePlanProvider"
import "./Session.css"


export const SessionForm = () => {
    const {createSession, editSession, getSession} = useContext(SessionContext)
    const { practicePlans, searchPracticePlans} = useContext(PracticePlanContext)
    const [ session, setSession ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();
    const [ searchTerms, setSearchTerms ] = useState("")
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
        searchPracticePlans(searchTerms, "", "")
    }, [ searchTerms ])

    const handleSaveSession = () => {
        if (sessionPracticePlan === undefined || session.lengthOfSession === "" || session.date === "" || session.notes === "" ||
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

    // Check if user is editing a session and get that session's data
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
        <>
        <div className="category-container">
        <form className="form--session" id="sessionForm">
            <div>
                <h1>{sessionId ? "Edit Session" : "Schedule a Session"}</h1>
            <div className="category-dropdown-container">
            Search Practice Plans: <input type="text" className="search" onKeyUp={(event) => {
              setSearchTerms(event.target.value)}}
                placeholder="Search Practice Plans... " />
            </div> 
            <div>
                <h4>Choose Practice Plan:</h4>
            </div>
            <fieldset>
                <div className="practicePlanExercises">
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
                <div className="practicePlan-detail-container">
                <h2>Practice Plan Details</h2>
                    <div><strong>Title</strong>   -   {sessionPracticePlan.title}</div>
                    <div><strong>Description</strong>   -   {sessionPracticePlan.description}</div>
                <h3>Practice Plan Exercises</h3>
                {sessionPracticePlan.exercises.map(exercise => (
                    <>
                        <div>
                            <div className="practicePlan-detail"><strong>Exercise Title</strong>   -   {exercise.title}</div>
                            <div className="practicePlan-detail"><strong>Exercise Description</strong>   -   {exercise.description}</div>
                            <div className="practicePlan-detail"><strong>Category</strong>   -   {exercise.category.label}</div>
                        </div>
                    </>
                    ))}
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="title">Length of Session in minutes: </label>
                <div>
                    <input className="form-control"  type="text" id="lengthOfSession" name="lengthOfSession" required autoFocus placeholder="Type number (e.g. '10')" value={session.lengthOfSession}
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <fieldset>
            <div className="category-dropdown-container">
                <label htmlFor="date">Schedule: </label>
                <input className="form-control"  type="date" id="date" name="date" required autoFocus
                placeholder="Date"
                onChange={handleControlledInputChange}
                value={session.date}/> 
            </div>
          </fieldset>
          <fieldset>
                <label htmlFor="notes">Session Notes: </label>
                <div>
                    <textarea className="form-control"  type="textarea" id="notes" name="notes" required autoFocus placeholder="Type Description Here" value={session.notes}
                    onChange={handleControlledInputChange}></textarea>
                </div>
            </fieldset>
            <fieldset style={{textAlign:"center"}}>
                <button className="btn btn-1 btn-sep icon-send" disabled={isLoading} onClick={event => {
                    event.preventDefault()
                    handleSaveSession()
                    setSession("")
                }}>{sessionId ? "Update Session" : "Create Session"}</button>
            </fieldset>
            </div>
        </form>
        </div>
        </>
    )
}