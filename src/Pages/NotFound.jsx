import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const NotFound = () => {
  return (
    <div className='not-found'>
      <div className='nf-inner '>
        <div className='nf-link'>
          <Link to='/' className='link-inner '>
            <div className='icon-group '>
              <FontAwesomeIcon icon={faArrowLeft} className='icon-back ' />
              <p className='icon-text '>Home</p>
            </div>
          </Link>
        </div>
        <div className='image '>
          <img
            className='image-main '
            src='https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000'
            alt='not found'
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
