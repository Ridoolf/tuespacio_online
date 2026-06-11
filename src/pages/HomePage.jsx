import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Packages from '../components/Packages/Packages';
import Process from '../components/Process/Process';
import ContactCta from '../components/ContactCta/ContactCta';
import Footer from '../components/Footer/Footer';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Packages />
        <Process />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
