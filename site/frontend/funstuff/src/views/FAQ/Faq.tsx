import * as React from "react";
import { getLogger } from "../../LogConfig";
import logo from "../../logo.svg";
import "./Faq.css";

// Used for adding parameters to the Faq tag
export interface IFaqProps {}

const log = getLogger("view.faq");

export default function Faq(props: IFaqProps) {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = React.useState({} as responseType);

  function getData(event: React.MouseEvent<HTMLButtonElement>) {
    log.debug("This is a test from FAQ");
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
      <header className="App-header"></header>
      <body className="App-body">
        <h1>FAQ Page</h1>
        <div className="App-questions">
          <p>How can I contact Fun Stuff?</p>
          <div>
            <li>You can email us at a info@funstuff.com where our customer service team will be happy to help you with whatever you may need.</li>
            <p>Do you ship worldwide?</p>
            <li>Yes.</li>
            <p>Where do you ship from?</p>
            <li>We ship from Canada.</li>
            <p>Can I change or cancel my order?</p>
            <li>As we aim to process as fast as possible, you must request any changes/cancellations within 12 hours of ordering. 
              All requests after this time will be denied. Your order can be returned for a full refund after it is received.</li>
            <p>What payment methods do you accept?</p>
            <li>We accept all major credit cards (VISA, Mastercard, AMEX) and PayPal payments.</li>
            <p>When will my order be processed?</p>
            <li>All orders are handled and shipped out from our warehouse. 
              Please allow extra time for your order to be processed during holidays and sale seasons. 
              We process orders between Monday and Friday. 
              Orders will be processed within 3-5 business days from the order date and shipped the next day after the processing day. 
              Please note that we don't ship on weekends.</li>
            <p>How long will it take to receive my order?</p>
            <li>Once you place your order, please allow 3-5 business days to process your orders. After that, it will take 7-14 business days for delivery.</li>
            <p>How do I return a product?</p>
            <li>Please contact us at info@funstuff.com</li>
            <p>What if the item(s) I received are defective/incorrect/damaged?</p>
            <li>Please contact us if you have received merchandise that is incorrect, missing, and/or defective. 
              Please include your order number, photographs of the item(s) and all related references upon receiving your package. 
              We will do our very best to resolve your case as soon as possible.</li>
            <p>When will I receive my refund?</p>
            <li>All refunds will be credited to your original form of payment.
              If you paid by credit or debit card, refunds will be sent to the card-issuing bank within 7-10 business days of receipt of the returned item or cancellation request. 
              Please contact the card-issuing bank with questions about when the credit will be posted to your account. 
              If you haven't received a credit for your return yet, here's what to do: Contact the bank/credit card company. 
              It may take some time before the refund is posted to your account.</li><br></br>
          </div>

        </div>
      </body>
    </div>
  );
}
