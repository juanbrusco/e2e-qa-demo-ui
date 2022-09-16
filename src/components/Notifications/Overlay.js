import React from 'react';
import ReactDOM from 'react-dom';
import './overlay.scss';

const Overlay = props => {
  return (
    <>
      {
        typeof document === 'undefined'
          ? null
          : ReactDOM.createPortal(
            <>
              <div id={props.id} style={props.style} className="layout__overlay" >
                {props.children}
              </div>
            </>
            , document.body
          )
      }
    </>
  );
};

export {
  Overlay
};

