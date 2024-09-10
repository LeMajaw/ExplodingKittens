import React, { useState, useEffect } from 'react';
import './CatButton.css';

const CatButton = ({onClick}) => {
  const [isAwake, setIsAwake] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const handleCatClick = () => {
    setIsAwake(true);
  };

  useEffect(() => {
    if (isAwake) {
      // Wait until the eyes are fully open
      const eyeOpenAnimationDuration = 600; // Duration of the eyes-open animation in milliseconds
      const timeout = setTimeout(() => {
        setIsZooming(true);

        // Redirect to the new page after the zoom effect
        setTimeout(() => {
          onClick();
        }, 250); // Adjust the delay if needed
      }, eyeOpenAnimationDuration + 550); // Wait 1 second after the eyes are open

      return () => clearTimeout(timeout);
    }
  }, [isAwake]);

  useEffect(() => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
      eye.addEventListener('click', function() {
        this.classList.toggle('open');
      });
    });

    // Cleanup event listeners on unmount
    return () => {
      eyes.forEach(eye => {
        eye.removeEventListener('click', function() {
          this.classList.toggle('open');
        });
      });
    };
  }, []);

  return (
    <div className="container" onClick={handleCatClick}>
      <div className={`cat ${isAwake ? 'awake' : ''}`}>
        <div className={`head ${isAwake ? 'awake' : ''}`}>
          <div className="ears">
            <div></div>
            <div></div>
          </div>
          <div className="face">
            <div className="eyes">
              <div className={`eye ${isAwake ? 'open' : ''} ${isZooming && 'zoom'}`}></div>
              <div className={`eye ${isAwake ? 'open' : ''}`}></div>
            </div>
            <div className="nose">
              <div className="mustache">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="mustache">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="tail"></div>
        </div>
        <div className="sleep">
          <div>z</div>
          <div>z</div>
          <div>z</div>
          <div>z</div>
          <div>z</div>
          <div>z</div>
        </div>
      </div>
      <div className="bg"></div>
    </div>
  );
};

export default CatButton;