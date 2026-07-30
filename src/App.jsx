import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import PageTransition from './components/layout/PageTransition';
import HomePage from './pages/HomePage';
import ServiciosPage from './pages/ServiciosPage';
import ProyectosPage from './pages/ProyectosPage';
import SobreMiPage from './pages/SobreMiPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServiciosPage />} />
            <Route path="/precios" element={<Navigate to="/servicios#planes" replace />} />
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/sobre-mi" element={<SobreMiPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
          </Routes>
        </PageTransition>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
