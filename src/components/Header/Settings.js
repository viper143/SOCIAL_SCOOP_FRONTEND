import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
      <>
      <Header />
      <div className='container'> 
      <div className="container col-12 col-md-6" style={{paddingTop: 120}}>
          <div className="border col-12 col-md-10 rounded shadow-sm p-2">
              <div className="button-div mx-5">
                  <Link className="btn btn-success w-100" to="/change-password">Upgrade your password</Link>
                  {/* <button className="btn btn-success w-100 px-5 py-2"></button> */}
              </div>
          </div>
      </div>
      </div>
      </>
  );
};

export default Settings;
