import React from "react";
import amuLogo from "./assets/images/amu-logo.png";

function Footer() {
  return (
    <>
      <div className="footer">
        <footer className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 footer-option">
              <h3>BookHub</h3>
              <ul className="list-unstyled">
                <li>
                  <p>A Book Store For AMU students</p>
                </li>
                <li>
                  <a href="https://www.instagram.com/ismaeel_bin_khaleel?igsh=cHprbGg0dDVienE=" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-square-instagram" style={{ color: "#c23329" }}></i>
                  </a>
                  <a href="https://www.linkedin.com/in/mohd-ismaeel-24139125b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin" style={{ color: "#0717ed" }}></i>
                  </a>
                  <a href="https://github.com/ismaeelkhaleel" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github" style={{ color: "#000000" }}></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 footer-option">
              <h3>Support</h3>
              <ul>
                <li><a href="/feedback">Feedback</a></li>
                <li><a href="mailto:pmohd367@gmail.com">pmohd367@gmail.com</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 footer-option">
              <h3>Security & Privacy</h3>
              <ul>
                <li><a href="/security/terms&conditions">Terms & Conditions</a></li>
                <li><a href="/security/privacypolicy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="rights">
            <div>
              <img src={amuLogo} alt="AMU Logo" />
            </div>
            <div>
              <h3>AMU Book Store</h3>
            </div>
            <div>
              <h5>Developed By Mohd Ismaeel</h5>
              <p>© 2024. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style>
        {`
          /* Page container styling */
          #root, body, html {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            margin: 0;
            padding: 0;
          }

          /* Main content should grow to fill space */
          .main-content {
            flex: 1;
          }

          /* Footer styling */
          .footer {
            background-color: #006633;
            color: white;
            width: 100%;
            padding: 20px 0;
          }

          /* Footer rights section */
          .rights {
            text-align: center;
          }

          .rights h3 {
            color: white;
            margin-top: 1rem;
          }

          .rights h5 {
            color: orange;
            margin-top: 1rem;
          }

          .rights p {
            color: white;
            margin-top: 1rem;
          }

          /* Footer options styling */
          .footer-option {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            padding: 15px;
          }

          .footer-option h3 {
            color: orange;
          }

          .footer-option p {
            color: white;
          }

          .footer-option a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .footer-option a:hover {
            color: black;
            transition: 0.5s;
          }

          .footer-option a i {
            margin-right: 2rem;
            font-size: 1.5rem;
          }

          .footer-option a i:hover {
            transform: scale(1.5);
            transition: 0.5s;
          }
        `}
      </style>
    </>
  );
}

export default Footer;
