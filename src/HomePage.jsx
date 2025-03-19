import React, { useEffect } from 'react';
import './HomePage.css';
import Illustration from '/src/assets/images/26-Programmer.svg';
import Illustration2 from '/src/assets/images/125-Online-Education.svg';
import ReportingImage from '/src/assets/images/59.-Reporting.svg';

function HomePage() {
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

  // Duplicate the features array to create a seamless loop
  const duplicatedFeatures = [...features, ...features];

  // Statistics data
  const statistics = [
    { number: '500+', label: 'Schools Using Komodo Hub' },
    { number: '50,000+', label: 'Active Students' },
    { number: '1,000+', label: 'Certified Teachers' },
    { number: '10M+', label: 'Lessons Completed' },
  ];

  // Generate random numbers, statistics, and emojis for the falling animation
  useEffect(() => {
    const container = document.querySelector('.falling-numbers-container');
    const emojis = ['-', '+', '='];
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

    const createFallingElement = () => {
      const element = document.createElement('div');
      element.classList.add('falling-number');
      element.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      element.style.animationDuration = `${Math.random() * 3 + 5}s`; // Slower fall speed
      element.style.fontSize = `${Math.random() * 1 + 1}rem`; // Smaller size
      element.style.opacity = `${Math.random() * 1 + 0.5}`; // More transparent
      element.innerText =
        Math.random() > 0.5
          ? numbers[Math.floor(Math.random() * numbers.length)] // Random number
          : emojis[Math.floor(Math.random() * emojis.length)]; // Random emoji
      container.appendChild(element);

      // Remove the element after it falls out of view
      element.addEventListener('animationend', () => {
        element.remove();
      });
    };

    // Generate falling elements at a slower rate
    const interval = setInterval(createFallingElement, 800); // Reduced frequency

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Add scroll animations for statistics
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const statisticElements = document.querySelectorAll('.statistic');
    statisticElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">Komodo Hub</div>
        <nav className="nav">
          <a href="#about">About Us</a>
          <a href="#courses">Features</a>
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
          <img src={Illustration} alt="Computer Guy" />
        </div>
        <div className="illustration2">
          <img src={Illustration2} alt="Online Education" />
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

      {/* Statistics Section */}
      <section className="statistics-section">
        {/* Falling numbers background */}
        <div className="falling-numbers-container"></div>

        <div className="statistics-container">
          <div className="statistics-image">
            <img src={ReportingImage} alt="Reporting" />
          </div>
          <div className="statistics-content">
            {statistics.map((stat, index) => (
              <div key={index} className="statistic">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;