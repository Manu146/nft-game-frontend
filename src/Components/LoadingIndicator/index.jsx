import "./LoadingIndicator.css";

const LoadingIndicator = ({ children }) => {
  return (
    <div className="w-full h-full z-20 fixed top-0 left-0 bg-black bg-opacity-80">
      <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default LoadingIndicator;
