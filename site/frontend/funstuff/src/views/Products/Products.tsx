import * as React from "react";
import { getLogger } from "../../LogConfig";
import logo from "../../logo.svg";

// Used for adding parameters to the products tag
export interface IProductsProps {}

const log = getLogger("view.products");

export default function Products(props: IProductsProps) {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = React.useState({} as responseType);

  function getData(event: React.MouseEvent<HTMLButtonElement>) {
    log.debug("This is a test from products");
    event.stopPropagation();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch(process.env.REACT_APP_API_ADDRESS as string, requestOptions)
      .then((resp) => resp.json())
      .then((data: responseType) =>
        setResponse({
          resp: data.resp + " " + (response.resp ? response.resp : ""),
        })
      );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>The Products</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form action="../../post" method="post" className="form">
          <button type="submit">Connected?</button>
        </form>
        <button type="submit" onClick={getData}>
          Test Api
        </button>
        <div>{response.resp}</div>
      </header>
    </div>
  );
}
