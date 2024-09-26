import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <img 
        src="https://cdn.pixabay.com/photo/2017/06/25/14/43/blogger-2440979_1280.png" 
        alt="Logo"
        style={{ width: 'auto', height: '50px' }} // Ensures the image is responsive
      />
    </div>
  );
}

export default Logo;
