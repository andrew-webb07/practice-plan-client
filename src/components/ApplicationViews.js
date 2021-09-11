import React from "react"
import { Route } from "react-router-dom"
import { SessionProvider } from "./session/SessionProvider"
import { SessionList } from "./session/SessionList"
import { ExerciseList } from "./exercise/ExerciseList"
import { ExerciseProvider } from "./exercise/ExerciseProvider"
import { PracticePlanProvider } from "./practicePlans/PracticePlansProvider"
import { PracticePlanDetail } from "./practicePlans/PracticePlanDetail"

export const ApplicationViews = () => {
    return (
        <>
            <SessionProvider>
                <ExerciseProvider>
                    <PracticePlanProvider>
                    <Route exact path="/">
                        <SessionList />
                    </Route>
                    <Route exact path="/exercises">
                        <ExerciseList />
                    </Route>
                    <Route exact path="/practiceplans/:practicePlanId(\d+)">
                        <PracticePlanDetail />
                    </Route>
                    </PracticePlanProvider>
                </ExerciseProvider>
            </SessionProvider>
        </>
    )
}