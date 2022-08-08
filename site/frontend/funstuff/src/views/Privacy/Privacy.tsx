import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import "./Privacy.css";

const log = getLogger("view.privacy");

export interface IPrivacyComponentProps {

}

export default function Privacy(props: IPrivacyComponentProps) {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType);

  return (
    <div className="Privacy">
      <header className="Privacy-header"></header>
      <body className="Privacy-body">
        <h1>Privacy Policy</h1>
        <div className="Privacy-questions">
          <div>
            <h3>Personal Info We Collect</h3>
            When you visit the Fun Stuff, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.<br></br><br></br>
            We collect Device Information using the following technologies:<br></br><br></br>
            When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers Mention all types of accepted payments, email address, and phone number). This is called Order Information.<br></br><br></br>
            By Personal Information in this Privacy Policy, we are talking both about Order Information.
            <h3>How We Use Your Personal Information</h3>
            We use the Order Information that we collect generally to fulfil any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).<br></br><br></br>
            We use this Order Information to:<br></br><br></br>
            Communicate with you.<br></br><br></br>
            When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.<br></br><br></br>
            We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site.
            <h3>Data Retention</h3>
            When you place an order through the Site, we will maintain your Order Information for our records.
            <h3>Changes</h3>
            We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.<br></br><br></br>
            If you have questions and/or require more information, do not hesitate to contact us at info@funstuff.com.
          </div>
        </div>
      </body>
    </div>
  );
}