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

  const [response, setResponse] = React.useState({} as responseType);


  return (
    <div className="Legal">
      <header className="Legal-header"></header>
      <body className="Legal-body">
        <h1>Legal Page</h1>
        <div className="Legal-questions">
          <div>
            <h3><u>Terms and Conditions</u></h3>
            Welcome to Fun Stuff!<br></br><br></br>

            These terms and conditions outline the rules and regulations for the use of Fun Stuffs Website, located at funstuff.com.<br></br><br></br>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Fun Stuff if you do not agree to take all of the terms and conditions stated on this page.<br></br><br></br>

            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
            <h3>License</h3>
            Unless otherwise stated, Fun Stuff and/or its licensors own the intellectual property rights for all material on Fun Stuff. All intellectual property rights are reserved. You may access this from Fun Stuff for your own personal use subjected to restrictions set in these terms and conditions.<br></br><br></br>
            You must not:

            <ul>
              <li>Republish material from Fun Stuff</li>
              <li>Sell, rent or sub-license material from Fun Stuff</li>
              <li>Reproduce, duplicate or copy material from Fun Stuff</li>
              <li>Redistribute content from Fun Stuff</li>
            </ul>

            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Fun Stuff does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Fun Stuff,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Fun Stuff shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.<br></br><br></br>
            Fun Stuff reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

            You warrant and represent that:
            <ul>
              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
              <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
              <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
              <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>
            You hereby grant Fun Stuff a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.<br></br><br></br>
            <h3>Hyperlinking to our Content</h3>
            The following organizations may link to our Website without prior written approval:
            <ul>
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
              <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
              <li></li>
              <li></li>
            </ul>

            These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
            <br></br><br></br>
            We may consider and approve other link requests from the following types of organizations:
            <ul>
              <li>commonly-known consumer and/or business information sources;</li>
              <li>.com community sites;</li>
              <li>associations or other groups representing charities;</li>
              <li>online directory distributors;</li>
              <li>internet portals;</li>
              <li>accounting, law and consulting firms; and</li>
              <li>educational institutions and trade associations.</li>
            </ul>

            We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Fun Stuff; and (d) the link is in the context of general resource information.
            These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.
            If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Fun Stuff. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
            Approved organizations may hyperlink to our Website as follows:
            <ul>
              <li>By use of our corporate name; or</li>
              <li>By use of the uniform resource locator being linked to; or</li>
              <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
              <li>No use of Fun Stuff's logo or other artwork will be allowed for linking absent a trademark license agreement.</li>
            </ul>

            <h3>Reservation of Rights</h3>
            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.<br></br><br></br>

            We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.

            <h3>Disclaimer</h3>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
            <ul>
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.<br></br><br></br>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
            <h3><u>Privacy Policy</u></h3>
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
          <h3><u>Refund Policy</u></h3>
          <div>
          We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.<br></br><br></br>
          To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.<br></br><br></br>
          To start a return, you can contact us at info@funstuff.com.<br></br><br></br>
          If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.<br></br><br></br>
          You can always contact us for any return question at info@funstuff.com.<br></br>
          <h3>Damages and issues</h3>
          Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.<br></br>
          <h3>Exceptions / non-returnable items</h3>
          Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.<br></br><br></br>
          Unfortunately, we cannot accept returns on sale items or gift cards.
          <h3>Exchanges</h3>
          The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          <h3>European Union 14 day colling off period</h3>
          Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
        <h3>Refunds</h3>
        We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.<br></br><br>
        </br>If more than 15 business days have passed since we’ve approved your return, please contact us at info@funstuff.com.
          </div>

        </div>
      </body>
    </div>
  );
}
