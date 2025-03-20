import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Illustration from '/src/assets/images/26-Programmer.svg';
import Illustration2 from '/src/assets/images/125-Online-Education.svg';
import ReportingImage from '/src/assets/images/12-Corporate-Trainer.svg';
import SalesTargetImage from '/src/assets/images/64.-Sales-Target.svg';
import FAQ from '/src/FAQ.jsx'; 
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [counters2, setCounters2] = useState([0, 0, 0, 0]);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [counters2Animated, setCounters2Animated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };


  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animations for statistics sections
            if (entry.target.closest('.statistics-section') && !countersAnimated) {
              animateCounters(setCounters, [500, 50000, 1000, 10000000]);
              setCountersAnimated(true); // Mark as animated to not load again
            }
            if (entry.target.closest('.statistics-section-2') && !counters2Animated) {
              animateCounters(setCounters2, [200, 95, 1000000, 24]);
              setCounters2Animated(true); // Mark as animated to not load again
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe statistics images and content to ensiure correct loading
    const statisticElements = document.querySelectorAll('.statistic, .statistic-2, .statistics-image, .statistics-image-2');
    statisticElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [countersAnimated, counters2Animated]);

  // Counter animation function
  const animateCounters = (setCounterFunction, targetValues) => {
    const duration = 2000;
    const interval = 10;

    targetValues.forEach((target, index) => {
      let start = 0;
      const increment = target / (duration / interval);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(timer);
          setCounterFunction((prev) => {
            const newCounters = [...prev];
            newCounters[index] = target;
            return newCounters;
          });
        } else {
          setCounterFunction((prev) => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(start);
            return newCounters;
          });
        }
      }, interval);
    });
  };

  // Features data
  const features = [
    {
      title: 'Endangered Species Knowledge Base',
      description: 'Access a comprehensive library of information about Indonesia’s endangered endemic species, including their habitats and conservation needs.',
    },
    {
      title: 'Community-Driven Conservation',
      description: 'Empower communities to contribute articles, sighting reports, and conservation efforts to expand the platform’s resources.',
    },
    {
      title: 'Interactive Learning Tools',
      description: 'Engage with interactive educational materials, games, and activities designed to promote awareness and involvement in conservation.',
    },
    {
      title: 'School Integration Features',
      description: 'Enable schools to manage student enrollment, create unique profiles, and incorporate conservation programs into their curricula.',
    },
    {
      title: 'Species Reporting System',
      description: 'Report sightings of endangered species using built-in tools to aid in tracking and monitoring biodiversity.',
    },
    {
      title: 'Privacy and Data Security',
      description: 'Ensure user data protection with encryption, authentication methods, and compliance with privacy regulations, especially for children’s data.',
    },
    {
      title: 'Scalable Infrastructure',
      description: 'Adapt to growing user demands with a scalable platform that doesn’t require investment in physical infrastructure.',
    },
  ];

  const duplicatedFeatures = [...features, ...features, ...features];

  // Statistics data
  const statistics = [
    { number: '200+', label: 'Schools using komodo hub', icon: <i className="pi pi-building" style={{ fontSize: '24px', color: 'white' }}></i> },
    { number: '5000+', label: 'Active students', icon: <i className="pi pi-users" style={{ fontSize: '24px', color: 'white' }}></i> },
    { number: '500+', label: 'Teachers ', icon: <i className="pi pi-check-circle" style={{ fontSize: '24px', color: 'white' }}></i> },
    { number: '10M+', label: 'Lessons completed', icon: <i className="pi pi-book" style={{ fontSize: '24px', color: 'white' }}></i> },
  ];

  const statistics2 = [
    { number: '6', label: 'Courses available', icon: <i className="pi pi-book" style={{ fontSize: '24px', color: 'black' }}></i> },
    { number: '95%', label: 'Percent satisfaction rate', icon: <i className="pi pi-check-circle" style={{ fontSize: '24px', color: 'black' }}></i> },
    { number: '1M+', label: 'Downloads', icon: <i className="pi pi-download" style={{ fontSize: '24px', color: 'black' }}></i> },
    { number: '24/7', label: 'Hour support availability', icon: <i className="pi pi-clock" style={{ fontSize: '24px', color: 'black' }}></i> },
  ];

  return (
    <div className="homepage">
      {/* Header */}
      <header className={`header ${!headerVisible ? (lastScrollY > 0 ? 'hide-up' : 'hide-down') : ''}`}>
        <div className="logo">Komodo Hub.</div>
        <nav className="nav">
          <a href="#about">About Us</a>
          <a href="#courses">Features</a>
          <a href="#professors">Contact</a>
          <button className="login-btn pulse">Log in</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="text-content">
          <h1>Welcome to Komodo Hub.</h1>
          <p>
            A space where current students and teachers can learn more about courses and their peers.
          </p>

          <div className="button-container">

          <button
              className={`LogInMain-btn ${isAnimating ? 'animate' : ''}`}
              onClick={handleLoginClick}
              disabled={isAnimating} // Disable the button during animation
            >
              {isAnimating ? '' : 'Log In'} {/* Hide text during animation */}
            </button>

            <button className="LearnMore-btn pulse">Learn More</button>

          </div>

        </div>
        <div className="illustration">
          <img src={Illustration} alt="Computer Guy" className="animated-illustration" />
        </div>
        <div className="illustration2">
          <img src={Illustration2} alt="Online Education" className="animated-illustration" />
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <h2>Tens of features!</h2>
        <div className="features-bar">
          <div className="features-track">
            {duplicatedFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section 1 */}
      <section className="statistics-section">
        <div className="statistics-container">
          <div className="statistics-image">
            <img src={ReportingImage} alt="Reporting" className="animated-illustration" />
          </div>
          <div className="statistics-content">
            {statistics.map((stat, index) => (
              <div key={index} className="statistic">
                <div className="icon">{stat.icon}</div>
                <h3>{counters[index].toLocaleString()}{stat.number.includes('+') && '+'}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section 2 */}
      <section className="statistics-section statistics-section-2">
        <div className="statistics-container-2">
          <div className="statistics-content-2">
            {statistics2.map((stat, index) => (
              <div key={index} className="statistic-2">
                <div className="icon">{stat.icon}</div>
                <h3>{counters2[index].toLocaleString()}{stat.number.includes('+') && '+'}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="statistics-image-2">
            <img src={SalesTargetImage} alt="Sales Target" className="animated-illustration" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
<footer className="footer">
  <div className="footer-content">
 
    <button className="logo-button">
      <img src="/src/assets/Logo Icon.svg" alt="Logo" className="logo-icon" />
    </button>


    {/* Social Media Icons */}
    <div className="social-media-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="pi pi-facebook"></i>
      </a>
      <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
        <i className="pi pi-discord"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <i className="pi pi-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="pi pi-instagram"></i>
      </a>
      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
        <i className="pi pi-tiktok"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <i className="pi pi-linkedin"></i>
      </a>
      <a href="https://reddit.com" target="_blank" rel="noopener noreferrer">
        <i className="pi pi-reddit"></i>
      </a>
    </div>
    <div className="footer-links">
      <a href="#terms">Terms of Service</a>
      <a href="#privacy">Privacy Policy</a>
      <button className="cookie-notice-btn">Cookie Notice</button>
      <a href="#contact">Contact Us</a>
      <a href="#about">About Us</a>
    </div>
    <div className="footer-copyright">
      &copy; {new Date().getFullYear()} Komodo Hub. All rights reserved.
    </div>
  </div>

  {/* Back to Top Button */}
  <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <i className="pi pi-arrow-up"></i>
  </button>
</footer>
    </div>
  );
}

export default HomePage;