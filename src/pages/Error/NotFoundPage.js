import React from 'react';


export function NotFoundTitle() {
  return (
      <div>
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"/>
        <div className="page-404">
          <div className="outer">
            <div className="middle">
              <div className="inner">

                <div className="inner-circle"><i
                    className="fa fa-home"></i><span>404</span></div>
                <span className="inner-status">Oops! You're lost</span>
                <span className="inner-detail">
                    We can not find the page you're looking for.
                <hr/>
                    <a href="/" className="btn btn-info mtl"><i
                        className="fa fa-home"></i>&nbsp;
                      Return home
                    </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}