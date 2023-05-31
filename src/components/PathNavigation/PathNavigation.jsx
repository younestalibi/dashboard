import React from 'react';
import './PathNavigation.css'; // Import the CSS file

const PathNavigation = ({ paths, currentPage }) => {
  return (
    <div className="path-navigation">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <span className="path-segment">{path}</span>
          {index !== paths.length - 1 && <span className="path-separator">/</span>}
        </React.Fragment>
      ))}
      <span className="path-separator">/</span>
      <span className="path-current-page">{currentPage}</span>
    </div>
  );
};

export default PathNavigation;
