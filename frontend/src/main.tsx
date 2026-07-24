import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {AuthProvider} from "./context/AuthContext";
import {JobProvider} from "./context/JobContext";
import "./styles/global.css";
import { CategoryProvider } from "./context/CategoryContext";
import {ApplicationProvider} from "./context/ApplicationContext";
console.log("Application Starting");

ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
<AuthProvider>
    <CategoryProvider>
        <JobProvider>
            <ApplicationProvider>
                <App />
            </ApplicationProvider>
        </JobProvider>
    </CategoryProvider>
</AuthProvider>
</React.StrictMode>
);

console.log("Application Started");