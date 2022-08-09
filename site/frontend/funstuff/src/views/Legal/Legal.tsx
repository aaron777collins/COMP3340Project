import * as React from "react";
import { getLogger } from "../../LogConfig";
import logo from "../../logo.svg";
import "./Legal.css";

// Used for adding parameters to the Legal tag
export interface ILegalProps {}

const log = getLogger("view.legal");

export default function Legal(props: ILegalProps) {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType);

  return (
    <div className="Legal">
      <header className="Legal-header"></header>
      <body className="Legal-body">
        <h1>Legal Information</h1>
        <div className="Legal-questions">
          <div>
            You can find all of our legal information at the following pages:<br></br><br></br>
            <ul>
              <li><a href="./terms" target="_blank">Terms and Conditions<br></br><br></br></a></li>
              <li><a href="./privacy" target="_blank">Privacy Policy<br></br><br></br></a></li>
              <li><a href="./refund" target="_blank">Refund Policy</a></li>
            </ul>
          </div>
        </div>
      </body>
    </div>
  );
}
