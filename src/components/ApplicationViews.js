import React from "react"
import { Route } from "react-router-dom"
import { SessionProvider } from "./session/SessionProvider"
import { SessionList } from "./session/SessionList"
import { SessionForm } from "./session/SessionForm"
import { ExerciseList } from "./exercise/ExerciseList"
import { ExerciseForm } from "./exercise/ExerciseForm"
import { ExerciseProvider } from "./exercise/ExerciseProvider"
import { PracticePlanProvider } from "./practicePlans/PracticePlanProvider"
import { PracticePlanDetail } from "./practicePlans/PracticePlanDetail"
import { PracticePlanList } from "./practicePlans/PracticePlanList"
import { CategoryProvider } from "./category/CategoryProvider"
import { CategoryForm } from "./category/CategoryForm"
import { CategoryList } from "./category/CategoryList"
import { PracticePlanForm } from "./practicePlans/PracticePlanForm"

export const ApplicationViews = () => {
    return (
        <>
            <SessionProvider>
                <ExerciseProvider>
                    <PracticePlanProvider>
                        <CategoryProvider>
                            <Route exact path="/">
                                <SessionList />
                            </Route>
                            <Route exact path="/exercises">
                                <ExerciseList />
                            </Route>
                            <Route exact path="/practiceplans/:practicePlanId(\d+)">
                                <PracticePlanDetail />
                            </Route>
                            <Route exact path="/practiceplans">
                                <PracticePlanList />
                            </Route>
                            <Route exact path="/categories">
                                <CategoryForm />
                                <CategoryList />
                            </Route>
                            <Route exact path="/exercises/create">
                                <ExerciseForm />
                            </Route>
                            <Route exact path="/practiceplans/create">
                                <PracticePlanForm />
                            </Route>
                            <Route exact path="/practiceplans/edit/:practicePlanId(\d+)">
                                <PracticePlanForm />
                            </Route>
                            <Route exact path="/sessions/create">
                                <SessionForm />
                            </Route>
                            <Route exact path="/sessions/edit/:sessionId(\d+)">
                                <SessionForm />
                            </Route>
                        </CategoryProvider>
                    </PracticePlanProvider>
                </ExerciseProvider>
            </SessionProvider>
        </>
    )
}