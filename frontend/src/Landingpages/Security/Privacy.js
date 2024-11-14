import React from "react";
function Privacy() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-5">
        <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
          <h1>Privacy Policy</h1>
          <h4>Effective Date: 05/11/2024</h4>
          <p>
            This Privacy Policy outlines how AMU Book Store (“we,” “us,” or
            “our”) collects, uses, discloses, and protects your personal
            information. By accessing or using our website, you agree to the
            collection and use of information in accordance with this policy.
          </p>
        </div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-center mt-2">
          <img src="/images/privacy.png" alt="terms" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6 col-md-12">
          <ol className="list">
            <li>
              <h4>Information Collection</h4>
              <p>
                We may collect personal information, such as your name, email
                address, and university details, during account creation.
                Additionally, we may gather non-personal information, including
                browsing patterns, IP address, and device type, to improve user
                experience.
              </p>
            </li>
            <li>
              <h4>Use of Information</h4>
              <p>
                <ul>
                  <li>
                    <b>Personal Information:</b>We use personal information to
                    provide, maintain, and improve our services, respond to
                    inquiries, and notify you of relevant updates.
                  </li>
                  <li>
                    <b>Non-Personal Information:</b>This helps us analyze
                    trends, manage the website, and understand user engagement
                    with our services.
                  </li>
                </ul>
              </p>
            </li>
            <li>
              <h4>Cookies and Tracking Technologies</h4>
              <p>
                We may use cookies and similar technologies to enhance your
                browsing experience. Cookies are small data files stored on your
                device that help us remember your preferences. You can set your
                browser to reject cookies; however, this may limit your use of
                certain features on the site.
              </p>
            </li>
            <li>
              <h4>Data Sharing</h4>
              <p>
                <ul>
                  <li>
                    <b>Third-Party Service Providers:</b>We may share your data
                    with trusted third-party vendors who assist us in operating
                    the website, provided they agree to keep the information
                    confidential.
                  </li>
                  <li>
                    <b>Legal Requirements:</b>We may disclose your data to
                    comply with legal obligations, enforce our terms and
                    conditions, or protect our rights and safety.
                  </li>
                </ul>
              </p>
            </li>
            <li>
              <h4>Data Security</h4>
              <p>
                We implement a range of security measures to protect your data
                from unauthorized access or disclosure. However, we cannot
                guarantee absolute security, and users are responsible for
                maintaining the confidentiality of their login information.
              </p>
            </li>
          </ol>
        </div>
        <div className="col-lg-6 col-md-12">
          <ol start={"6"} className="list">
            <li>
              <h4>Retention of Data</h4>
              <p>
                Personal information will be retained only as long as necessary
                for the purposes outlined in this policy, or as required by law.
              </p>
            </li>
            <li>
              <h4>Your Rights</h4>
              <p>
                Users have the right to access, update, or delete their personal
                information stored with us. To make changes, you may contact us
                directly at pmohd367@gmail.com.
              </p>
            </li>
            <li>
              <h4>Children’s Privacy</h4>
              <p>
                The AMU Book Store is intended for university-level users. We do
                not knowingly collect information from children under the age of
                13. If such data is inadvertently collected, please contact us
                to ensure its deletion.
              </p>
            </li>
            <li>
              <h4>Changes to the Privacy Policy</h4>
              <p>
                We reserve the right to modify this Privacy Policy. Users will
                be notified of significant changes, and the updated policy will
                be posted on this page. Continued use of the site after changes
                indicates acceptance of the revised policy.
              </p>
            </li>
            <li>
              <h4>Contact Us</h4>
              <p>
                For questions or concerns regarding this Privacy Policy, please
                contact us at pmohd367@gmail.com.
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

export default Privacy;
