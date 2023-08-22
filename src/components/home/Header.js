import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <main>
      <div className="max-w-4xl lg:w-full mx-0 lg:mx-auto py-7 px-4 sm:py-20 sm:px-6 lg:px-3">
        <div className="text-center flex flex-col lg:flex-row md:items-center lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Image Column */}
          <div className="my-3 md:w-1/2 lg:w-auto">
            <div className="profile-image-container">
              <img
                src={`portfolio/profile.jpg`}
                alt="Franco Thomas Ortiz full stack python developer"
                className="profile-image w-32 h-32 md:w-[40vh] md:h-[40vh] mx-auto md:rounded-lg"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="md:w-1/2 lg:w-auto">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
              Python Full stack Developer.
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Franco Ortiz.
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 text-center lg:text-justify lg:mx-3">
              Solving problems and creating seamless digital experiences.
              Whether you require a responsive website, an interactive web
              application, or a scalable platform, I am ready to tackle any
              challenge. My goal is to provide you with efficient and effective
              solutions through clean, well-structured code. I work closely with
              you to understand your requirements and translate them into
              practical and elegant solutions. Together, we can create impactful
              solutions that propel your business success and deliver lasting
              value through code.
            </p>
            <Link
              to="/portfolio/cv.pdf"
              className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              target="_blank"
            >
              Download CV
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Header);
