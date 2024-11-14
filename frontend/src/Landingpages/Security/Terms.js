import React from "react";

function Terms() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-5">
        <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
          <h1>Terms and Conditions</h1>
          <h4>Effective Date: 05/11/2024</h4>
          <p>
            Here’s a detailed version of the terms and conditions for your AMU
            Book Store project: Terms and Conditions By accessing or using the
            BookHub(AMU Book Store) website and its services, you agree to
            comply with and be bound by the following terms and conditions. If
            you do not agree with these terms, please do not use our website.
          </p>
        </div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-center mt-2">
          <img src="/images/terms.png" alt="terms" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6 col-md-12">
          <ol className="list">
            <li>
              <h4>Account Creation</h4>
              <p>
                To access certain features of the website, you may be required
                to create an account. You agree to provide accurate, current,
                and complete information during the registration process and to
                update such information to keep it accurate, current, and
                complete. You are responsible for maintaining the
                confidentiality of your account credentials and are fully
                responsible for all activities that occur under your account.
                You agree to notify us immediately of any unauthorized use of
                your account or any other breach of security.
              </p>
            </li>
            <li>
              <h4>User Conduct</h4>
              <p>
                You agree not to upload, post, or otherwise transmit any content
                that is illegal, harmful, threatening, abusive, harassing,
                defamatory, vulgar, obscene, or otherwise objectionable. You
                also agree not to impersonate any person or entity or falsely
                state or misrepresent your affiliation with a person or entity.
              </p>
            </li>
            <li>
              <h4>Intellectual Property</h4>
              <p>
                All content available on the AMU Book Store website, including
                but not limited to text, graphics, logos, and images, is the
                property of their respective owners and is protected by
                copyright and other intellectual property laws. You may use the
                content for personal, non-commercial purposes only.
                Redistribution, modification, or use for commercial purposes
                without prior written permission is prohibited.
              </p>
            </li>
            <li>
              <h4>Book Use</h4>
              <p>
                The books available on the AMU Book Store website are intended
                for personal use only. Users are prohibited from redistributing,
                selling, or otherwise making available the books for commercial
                purposes.
              </p>
            </li>
            <li>
              <h4>Disclaimer of Warranties</h4>
              <p>
                The AMU Book Store website and its services are provided "as is"
                and "as available" without any warranties of any kind, either
                express or implied. We do not warrant that the website will be
                uninterrupted or error-free, that defects will be corrected, or
                that the website is free of viruses or other harmful components.
              </p>
            </li>
          </ol>
        </div>
        <div className="col-lg-6 col-md-12">
          <ol start={"6"} className="list">
            <li>
              <h4>Limitation of Liability</h4>
              <p>
                In no event shall AMU Book Store, its affiliates, or their
                respective directors, employees, agents, or licensors be liable
                for any indirect, incidental, special, consequential, or
                punitive damages arising from or relating to your use of the
                website or its services.
              </p>
            </li>
            <li>
              <h4>Indemnification</h4>
              <p>
                You agree to indemnify and hold harmless AMU Book Store and its
                affiliates from any claims, losses, damages, liabilities, and
                expenses, including reasonable attorney’s fees, arising out of
                or related to your use of the website, your violation of these
                terms, or your violation of any rights of another party.
              </p>
            </li>
            <li>
              <h4>Governing Law</h4>
              <p>
                These terms and conditions shall be governed by and construed in
                accordance with the laws of [Insert Jurisdiction]. Any disputes
                arising out of or related to these terms shall be resolved in
                the courts of [Insert Jurisdiction].
              </p>
            </li>
            <li>
              <h4>Modifications to Terms</h4>
              <p>
                AMU Book Store reserves the right to modify these terms and
                conditions at any time. We will notify users of any changes by
                posting the new terms on our website. Your continued use of the
                website after any changes constitutes acceptance of the new
                terms.
              </p>
            </li>
            <li>
              <h4>Contact Information</h4>
              <p>
                If you have any questions about these terms and conditions,
                please contact us at pmohd367@gmail.com.
              </p>
            </li>
          </ol>
        </div>
      </div>
      <style>
        {`
          img{
          border-radius: 50%;
          }
          .list li::marker {
           font-size: 1.4rem;  
           font-weight: 500;
           color: #333;  
          }
  
          `}
      </style>
    </div>
  );
}
export default Terms;
