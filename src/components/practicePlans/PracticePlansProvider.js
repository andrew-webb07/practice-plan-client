import React, { useState } from "react"

export const PracticePlanContext = React.createContext()

export const PracticePlanProvider = (props) => {
    const [ practicePlans, setPracticePlans ] = useState([])

    const getPracticePlans = () => {
        return fetch("http://localhost:8000/practiceplans", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
            .then(setPracticePlans)
    }

    const getPracticePlan = (practicePlanId) => {
        return fetch(`http://localhost:8000/practiceplans/${practicePlanId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
    }

    const createPracticePlan = (practicePlan) => {
        return fetch("http://localhost:8000/practiceplans", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(practicePlan)
        }).then(getPracticePlans)
    }

    const editPracticePlan = (practicePlan) => {
        return fetch(`http://localhost:8000/practiceplans/${practicePlan.id}`, { 
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                "Content-Type": "application/json"               
            },
            body: JSON.stringify(practicePlan)
        }).then(getPracticePlans)
    }

    const deletePracticePlan = (practicePlanId) => {
        return fetch(`http://localhost:8000/practiceplans/${practicePlanId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
        .then(getPracticePlans)
    }

    return (
        <PracticePlanContext.Provider value={{ practicePlans, getPracticePlans, createPracticePlan, editPracticePlan, getPracticePlan, deletePracticePlan}} >
            { props.children }
        </PracticePlanContext.Provider>
    )
}