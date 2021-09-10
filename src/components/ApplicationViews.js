import React from "react"
import { Route } from "react-router-dom"
import { SessionProvider } from "./session/SessionProvider"
import { SessionList } from "./session/SessionList"

export const ApplicationViews = () => {
    return (
        <>
            <SessionProvider>
                <Route exact path="/">
                    <SessionList />
                </Route>
                {/* <Route exact path="/sessions/:sessionId(\d+)">
					<PracticePlanDetails />
				</Route> */}
            </SessionProvider>
        </>
    )
}