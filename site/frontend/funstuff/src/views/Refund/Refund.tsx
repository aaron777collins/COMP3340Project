import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import "./Refund.css";

const log = getLogger("view.refund");

export interface IRefundComponentProps {

}

export default function Refund(props: IRefundComponentProps) {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType);

  return (
    <div className="Refund">
      <header className="Refund-header"></header>
      <body className="Refund-body">
        <h1>Refund Policy</h1>
        <div className="Refund-questions">
          <div>
            <div>
              <div style={{'marginLeft': '5vmin'}}>
                We have a 30-day return policy📆, which means you have 30 days after receiving your item to request a return.<br></br>
                To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.<br></br><br></br>
                To start a return, you can contact us at info@funstuff.com.<br></br>
                If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.<br></br><br></br>
                You can always contact us for any return question at info@funstuff.com.<br></br>
              </div>
              <h2>🔥Damages and issues</h2>
              <div style={{'marginLeft': '5vmin'}}>
              Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.<br></br>
              </div>
              <h2>💢Exceptions / non-returnable items</h2>
              <div style={{'marginLeft': '5vmin'}}>
              Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.<br></br><br></br>
              Unfortunately, we cannot accept returns on sale items or gift cards.
              </div>
              <h2>♻️Exchanges</h2>
              <div style={{'marginLeft': '5vmin'}}>
              The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
              </div>
              <h2>💶European Union 14 day cooling off period</h2>
              <div style={{'marginLeft': '5vmin'}}>
              Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
              </div>
              <h2>🔃Refunds</h2>
              <div style={{'marginLeft': '5vmin'}}>
              We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.<br></br>
              If more than 15 business days have passed since we’ve approved your return, please contact us at info@funstuff.com.
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}