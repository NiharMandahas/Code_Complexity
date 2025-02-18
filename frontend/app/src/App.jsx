// import Bar from './sidebar/Sidebar.jsx'
// import './App.css';

// import { BrowserRouter as Router, Routes, Route,useLocation  } from "react-router-dom";
// // import { CSSTransition, TransitionGroup } from "react-transition-group";

// function App() {
//   return(
//     <div className='app'>
//       <Route path="/" element={<Bar />} />
//       {/* <Bar></Bar> */}
//     </ div>
//   );
// }

// export default App;



// import React from 'react';
// import Bar from './sidebar/Sidebar.jsx';
// import './App.css';
// import Home from './Home.jsx';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <Router>  {/* Wrap the routes in Router */}
//       <div className="app">
//         <Routes> {/* Use Routes instead of just Route */}
//           <Route path="/run" element={<Bar />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import Bar from './sidebar/Sidebar.jsx';
import Home from './Home.jsx'; // Import Home component
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home component at '/' */}
          <Route path="/run" element={<Bar />} />  {/* Bar component at '/run' */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
