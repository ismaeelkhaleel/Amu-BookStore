import React from "react";
import Typewriter from "typewriter-effect";
import ebook from "../../assets/images/ebook.png";
function HomePage() {
  return (
    <>
      <div className="container mt-2 mb-5">
        <div className="text-scroll-container">
          <div className="scrolling-text" style={{ color: "#5a26b5" }}>
            <b style={{ color: "orange" }}>1.</b>M.A. Library currently holds
            about 14 lakhs volumes of books.{" "}
            <b style={{ color: "orange" }}>2.</b>M.A. Library is one of the
            largest university libraries of the world
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 d-flex flex-column justify-content-center">
            <h2>Welcome to BookHub!</h2>
            <p>The one-stop destination for all your book needs.</p>
            <h6 className="typewriter-text mb-5">
              <Typewriter
                options={{
                  strings: [
                    "Only Academic Books are available here.",
                    "All the books are of free of cost.",
                    "Here are the books which are available free on the internet.",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
                onInit={(typewriter) => {
                  typewriter.pauseFor(2000).start();
                }}
              />
            </h6>
            <a href="/books">
              <button className="btn btn-outline-primary home-btn">
                Explore Books&nbsp;<i class="fa-solid fa-arrow-right"></i>
              </button>
            </a>
            <a href="/addbook">
              <button className="btn btn-outline-success home-btn">
                Add Book&nbsp;<i class="fa-solid fa-upload"></i>
              </button>
            </a>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 home-image d-flex justify-content-center">
            <img src={ebook} alt="ebook" />
          </div>
        </div>
      </div>
      <style>
        {`
        .home-image img {
          width: 70%;
          object-fit: cover;
          border-radius: 50%;
        }
          .home-btn {
            width: 50%;
            margin: 0.5rem;
          }
          .text-scroll-container {
           overflow: hidden;
            white-space: nowrap;
          width: 100%;
         }

         .scrolling-text {
         display: inline-block;
         padding-left: 100%;
         animation: scroll-text 30s linear infinite;
          font-size: 1.2rem;
         color: #333;
        }

        @keyframes scroll-text {
        0% {
         transform: translateX(0%);
          }
       100% {
        transform: translateX(-100%);
       }
       }

        `}
      </style>
    </>
  );
}

export default HomePage;
