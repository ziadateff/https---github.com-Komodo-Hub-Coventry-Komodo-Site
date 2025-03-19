import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Illustration from '/src/assets/images/26-Programmer.svg';
import Illustration2 from '/src/assets/images/125-Online-Education.svg';
import ReportingImage from '/src/assets/images/12-Corporate-Trainer.svg';
import SalesTargetImage from '/src/assets/images/64.-Sales-Target.svg';

function HomePage() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [counters2, setCounters2] = useState([0, 0, 0, 0]);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [counters2Animated, setCounters2Animated] = useState(false);

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
              setCountersAnimated(true); // Mark as animated
            }
            if (entry.target.closest('.statistics-section-2') && !counters2Animated) {
              animateCounters(setCounters2, [200, 95, 1000000, 24]);
              setCounters2Animated(true); // Mark as animated
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    // Observe statistics images and content
    const statisticElements = document.querySelectorAll('.statistic, .statistic-2, .statistics-image, .statistics-image-2');
    statisticElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [countersAnimated, counters2Animated]); // Add dependencies

  // Counter animation function
  const animateCounters = (setCounterFunction, targetValues) => {
    const duration = 2000; // Animation duration in milliseconds
    const interval = 10; // Update interval in milliseconds

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
      title: 'Interactive Courses',
      description: 'Engage with interactive and hands-on learning materials.',
    },
    {
      title: 'Collaborative Learning',
      description: 'Work with peers and teachers in real-time.',
    },
    {
      title: 'Progress Tracking',
      description: 'Track your learning progress with detailed analytics.',
    },
    {
      title: 'Certification Programs',
      description: 'Earn certifications to showcase your skills.',
    },
    {
      title: '24/7 Support',
      description: 'Get help anytime with our dedicated support team.',
    },
    {
      title: 'Customizable Learning Paths',
      description: 'Tailor your learning journey to your goals.',
    },
    {
      title: 'Mobile Accessibility',
      description: 'Learn on the go with our mobile-friendly platform.',
    },
  ];

  const duplicatedFeatures = [...features, ...features];

  // Statistics data
  const statistics = [
    { number: '500+', label: 'Schools Using Komodo Hub', icon: <i className="pi pi-building" style={{ fontSize: '24px', color: 'white' }}></i> },
    { number: '50,000+', label: 'Active Students', icon: <i className="pi pi-users" style={{ fontSize: '24px', color: 'white' }}></i> },
    { number: '1,000+', label: 'Certified Teachers', icon: <i className="pi pi-check-circle" style={{ fontSize: '24px', color: 'white' }}></i> },
    { number: '10M+', label: 'Lessons Completed', icon: <i className="pi pi-book" style={{ fontSize: '24px', color: 'white' }}></i> },
  ];

  const statistics2 = [
    { number: '200+', label: 'Courses Available', icon: <i className="pi pi-book" style={{ fontSize: '24px', color: 'black' }}></i> },
    { number: '95%', label: 'Satisfaction Rate', icon: <i className="pi pi-check-circle" style={{ fontSize: '24px', color: 'black' }}></i> },
    { number: '1M+', label: 'Downloads', icon: <i className="pi pi-users" style={{ fontSize: '24px', color: 'black' }}></i> },
    { number: '24/7', label: 'Support Availability', icon: <i className="pi pi-clock" style={{ fontSize: '24px', color: 'black' }}></i> },
  ];

  return (
    <div className="homepage">
      {/* Header */}
      <header className={`header ${!headerVisible ? (lastScrollY > 0 ? 'hide-up' : 'hide-down') : ''}`}>
        <div className="logo">Komodo Hub</div>
        <nav className="nav">
          <a href="#about">About Us</a>
          <a href="#courses">Tens of Features!</a>
          <a href="#professors">Contact</a>
          <button className="login-btn">Log in</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="text-content">
          <h1>Welcome to Komodo Hub</h1>
          <p>
            A space where current students and teachers can learn more about courses and their peers.
          </p>
          <div className="button-container">
            <button className="Contact-btn">Contact</button>
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
        <h2>Features</h2>
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
            {/* Social Media Icons */}
            <div className="social-media-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="pi pi-facebook" style={{ color: 'white' }}></i>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <i className="pi pi-discord" style={{ color: 'white' }}></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="pi pi-twitter" style={{ color: 'white' }}></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="pi pi-instagram" style={{ color: 'white' }}></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <i className="pi pi-tiktok" style={{ color: 'white' }}></i>
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
      </footer>
    </div>
  );
}

export default HomePage;