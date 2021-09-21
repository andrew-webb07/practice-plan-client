import React, { useState } from "react"

export const SessionContext = React.createContext()

export const SessionProvider = (props) => {
    const [ sessions, setSessions ] = useState([])

    const getSessions = () => {
        return fetch("https://practice-plan-server.herokuapp.com/sessions", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
            .then(setSessions)
    }

    const getSession = (sessionId) => {
        return fetch(`https://practice-plan-server.herokuapp.com/sessions/${sessionId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
    }

    const createSession = (session) => {
        return fetch("https://practice-plan-server.herokuapp.com/sessions", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(session)
        }).then(getSessions)
    }

    const editSession = (session) => {
        return fetch(`https://practice-plan-server.herokuapp.com/sessions/${session.id}`, { 
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                "Content-Type": "application/json"               
            },
            body: JSON.stringify(session)
        }).then(getSessions)
    }

    const deleteSession = (sessionId) => {
        return fetch(`https://practice-plan-server.herokuapp.com/sessions/${sessionId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
        .then(getSessions)
    }

    return (
        <SessionContext.Provider value={{ sessions, getSessions, createSession, editSession, getSession, deleteSession}} >
            { props.children }
        </SessionContext.Provider>
    )
}