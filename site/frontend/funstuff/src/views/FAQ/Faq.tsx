import * as React from "react";
import { getLogger } from "../../LogConfig";
import logo from "../../logo.svg";
import "./Faq.css";

// Used for adding parameters to the Faq tag
export interface IFaqProps {}

const log = getLogger("view.faq");

export default function Faq() {
  

  return (
    <div className="Faq">
      <div className="Faq-body" >
        <h1>FAQ Page</h1>
        <div className="Faq-questions">
          <h3>How can I contact Fun Stuff?</h3>
          <div>
            <li>You can email us at a info@funstuff.com where our customer service team will be happy to help you with whatever you may need.</li>
            <h3>Do you ship worldwide?</h3>
            <li>Yes.</li>
            <h3>Where do you ship from?</h3>
            <li>We ship from Canada.</li>
            <h3>Can I change or cancel my order?</h3>
            <li>As we aim to process as fast as possible, you must request any changes/cancellations within 12 hours of ordering. 
              All requests after this time will be denied. Your order can be returned for a full refund after it is received.</li>
            <h3>What payment methods do you accept?</h3>
            <li>We accept all major credit cards (VISA, Mastercard, AMEX) and PayPal payments.</li>
            <h3>When will my order be processed?</h3>
            <li>All orders are handled and shipped out from our warehouse. 
              Please allow extra time for your order to be processed during holidays and sale seasons. 
              We process orders between Monday and Friday. 
              Orders will be processed within 3-5 business days from the order date and shipped the next day after the processing day. 
              Please note that we don't ship on weekends.</li>
            <h3>How long will it take to receive my order?</h3>
            <li>Once you place your order, please allow 3-5 business days to process your orders. After that, it will take 7-14 business days for delivery.</li>
            <h3>How do I return a product?</h3>
            <li>Please contact us at info@funstuff.com</li>
            <h3>What if the item(s) I received are defective/incorrect/damaged?</h3>
            <li>Please contact us if you have received merchandise that is incorrect, missing, and/or defective. 
              Please include your order number, photographs of the item(s) and all related references upon receiving your package. 
              We will do our very best to resolve your case as soon as possible.</li>
            <h3>When will I receive my refund?</h3>
            <li>All refunds will be credited to your original form of payment.
              If you paid by credit or debit card, refunds will be sent to the card-issuing bank within 7-10 business days of receipt of the returned item or cancellation request. 
              Please contact the card-issuing bank with questions about when the credit will be posted to your account. 
              If you haven't received a credit for your return yet, here's what to do: Contact the bank/credit card company. 
              It may take some time before the refund is posted to your account.</li><br></br>
          </div>

        </div>
      </div>
    </div>
  );
}
