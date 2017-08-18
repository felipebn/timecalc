import * as React from "react";
import * as ReactDOM from "react-dom";

import { Calculator } from "./components/Calculator";

ReactDOM.render(
    <Calculator compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);