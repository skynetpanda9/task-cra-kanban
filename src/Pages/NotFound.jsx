import React from "react";
import { Link } from "react-router-dom";
import { LeftArrow } from "../icons";
import { NotFoundStyles } from "../styles";

const NotFound = () => {
  return (
    <div className={NotFoundStyles.nfMain}>
      <div className={NotFoundStyles.nf2}>
        <div className={NotFoundStyles.nf3}>
          <Link to='/' className={NotFoundStyles.nfLink}>
            <div className={NotFoundStyles.nfLink2}>
              <div className={NotFoundStyles.nfLinkHover}>
                <LeftArrow />
              </div>
              <p className='mr-6 group-hover:text-gray-300'>Home</p>
            </div>
          </Link>
        </div>
        <div className={NotFoundStyles.nfImage}>
          <img
            className='rounded-md'
            src='https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000'
            alt='not found'
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
