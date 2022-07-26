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
      <body className="poroductsClass">
        <h1>Featured Products</h1>
          <div className="product-details">
          <p>Gallery</p>
            <p>product info</p>

          </div>
        
      </body>
      </header>

    </div>
  );
}
