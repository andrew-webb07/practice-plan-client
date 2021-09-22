import React, { useState } from "react"

export const PracticePlanContext = React.createContext()

export const PracticePlanProvider = (props) => {
    const [ practicePlans, setPracticePlans ] = useState([])

    const getPracticePlans = () => {
        return fetch("https://practice-plan-server.herokuapp.com/practiceplans", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
            .then(setPracticePlans)
    }

    const searchPracticePlans = (searchTerms, categoryTerms, isUser) => {
        return fetch(`https://practice-plan-server.herokuapp.com/practiceplans?q=${searchTerms}&category=${categoryTerms}&isUser=${isUser}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
        .then(res => res.json())
        .then(setPracticePlans)
    }

    const userPracticePlans = (isUser) => {
        return fetch(`https://practice-plan-server.herokuapp.com/practiceplans?isUser=${isUser}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
        .then(res => res.json())
        .then(setPracticePlans)
    }

    const getPracticePlan = (practicePlanId) => {
        return fetch(`https://practice-plan-server.herokuapp.com/practiceplans/${practicePlanId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
            .then(response => response.json())
    }

    const createPracticePlan = (practicePlan) => {
        return fetch("https://practice-plan-server.herokuapp.com/practiceplans", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(practicePlan)
        }).then(getPracticePlans)
    }

    const editPracticePlan = (practicePlan) => {
        return fetch(`https://practice-plan-server.herokuapp.com/practiceplans/${practicePlan.id}`, { 
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
                "Content-Type": "application/json"               
            },
            body: JSON.stringify(practicePlan)
        }).then(getPracticePlans)
    }

    const deletePracticePlan = (practicePlanId) => {
        return fetch(`https://practice-plan-server.herokuapp.com/practiceplans/${practicePlanId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`
            }
        })
        .then(() => userPracticePlans(""))
    }

    const getPracticePlanDetails = (practicePlanId) => {
		return (
			fetch(`https://practice-plan-server.herokuapp.com/practiceplans/${practicePlanId}`,
			{
				headers: {
					"Authorization": `Token ${localStorage.getItem("practice-plan_user_token")}`,
				},
			}		
		)).then((res) => res.json())
	};

    return (
        <PracticePlanContext.Provider value={{ practicePlans, getPracticePlans, createPracticePlan, editPracticePlan, getPracticePlan, deletePracticePlan, getPracticePlanDetails, searchPracticePlans, userPracticePlans}} >
            { props.children }
        </PracticePlanContext.Provider>
    )
}