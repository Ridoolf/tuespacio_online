import { Routes, Route } from 'react-router-dom';
import ScrollManager from './components/ScrollManager/ScrollManager';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
