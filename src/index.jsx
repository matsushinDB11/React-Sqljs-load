import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import SqlLoad from "./SqlLoad";

ReactDOM.render(
    <React.StrictMode>
        <SqlLoad/>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
)
;
