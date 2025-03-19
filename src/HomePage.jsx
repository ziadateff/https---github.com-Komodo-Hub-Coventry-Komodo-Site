import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HTMLFlipBook from 'react-pageflip';
import './HomePage.css';
import CoventryKomodoLogo from '/src/assets/CoventryKomodo.png';

function AnimatedSection({ children, className }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className={`${className} ${inView ? 'animate' : 'hidden'}`}>
      {children}
    </div>
  );
}

function HomePage() {
  const shapesRef = useRef([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const bookRef = useRef(null);

  const features = [
    {
      title: "Message Boards",
      description: "Foster collaboration and engagement through interactive discussions with peers and instructors. Share ideas, ask questions, and explore topics in a dynamic virtual environment.",
    title: "Message Boards",
      description: "Foster collaboration and engagement through interactive discussions with peer"
    },
    // Add other features here...
  ];

  const handleScroll = () => {
    const scrollY = window.scrollY;
    shapesRef.current.forEach((shape, index) => {
      const speed = [0.2, 0.4, 0.6, 0.8, 1][index];
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });

    setIsScrolled(scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      {/* Logo */}
      <div className="logo-container">
        <img src={CoventryKomodoLogo} alt="Komodo Hub Logo" className="logo" />
      </div>

      {/* Top-Right Buttons */}
      <div className={`top-right-buttons ${isScrolled ? 'fly-up' : ''}`}>
        <button className="nav-button">Contact</button>
        <button className="nav-button">About</button>
        <button className="nav-button">Features</button>
      </div>

      {/* Background Shapes */}
      <div className="background-shapes">
        {/* Circle */}
        <div ref={(el) => (shapesRef.current[0] = el)} className="shape circle"></div>
        {/* Triangle */}
        <div ref={(el) => (shapesRef.current[1] = el)} className="shape triangle"></div>
        {/* Square */}
        <div ref={(el) => (shapesRef.current[2] = el)} className="shape square"></div>
        {/* Hexagon */}
        <div ref={(el) => (shapesRef.current[3] = el)} className="shape hexagon"></div>
        {/* Star */}
        <div ref={(el) => (shapesRef.current[4] = el)} className="shape star"></div>
        {/* Oval */}
        <div ref={(el) => (shapesRef.current[5] = el)} className="shape oval"></div>
        {/* Diamond */}
        <div ref={(el) => (shapesRef.current[6] = el)} className="shape diamond"></div>
        {/* Heart */}
        <div ref={(el) => (shapesRef.current[7] = el)} className="shape heart"></div>
        {/* Cross */}
        <div ref={(el) => (shapesRef.current[8] = el)} className="shape cross"></div>
      </div>

      {/* Hero Section */}
      <AnimatedSection className="hero">
        <div className="hero-content">
          <h1>Empowering Innovation with Komodo Hub</h1>
          <p>Your gateway to smarter solutions for education and collaboration.</p>
          <button className="cta-button">Log In</button>
        </div>
        <div className="hero-image">
          <img src={CoventryKomodoLogo} alt="Komodo Hub Platform" />
        </div>
      </AnimatedSection>

      {/* Value Proposition */}
      <AnimatedSection className="value-proposition">
        {[
          { icon: '📚', text: 'Collaborative Tools' },
          { icon: '🔗', text: 'Seamless Integration' },
          { icon: '📊', text: 'Expert Support' }
        ].map((item, idx) => (
          <div key={idx} className="value-card" style={{ '--delay': `${idx * 0.2}s` }}>
            <div className="icon">{item.icon}</div>
            <h3>{item.text}</h3>
            <p>Engage seamlessly with intuitive features.</p>
          </div>
        ))}
      </AnimatedSection>

      {/* Features Section with Flip Book */}
      <AnimatedSection className="features">
        <h2>Features Designed for You</h2>
        <div className="book-container">
          <HTMLFlipBook
            width={600} // Adjusted for a larger book
            height={800} // Adjusted for a larger book
            minWidth={300}
            maxWidth={800}
            minHeight={400}
            maxHeight={1000}
            maxShadowOpacity={0.5}
            showCover={true}
            flippingTime={800}
            ref={bookRef}
            className="flip-book"
          >
            {/* Front Cover */}
            <div className="page cover-page">
              <h2>Komodo Hub Features</h2>
              <p>Explore key features designed for you.</p>
            </div>

            {/* Feature Pages */}
            {features.map((feature, idx) => (
              <div key={idx} className="page feature-page">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}

            {/* Back Cover */}
            <div className="page cover-page">
              <h2>End of Features</h2>
              <p>Thank you for exploring.</p>
            </div>
          </HTMLFlipBook>

          {/* Book Controls */}
          <div className="book-controls">
            <button onClick={() => bookRef.current.pageFlip().flipPrev()}>Previous</button>
            <button onClick={() => bookRef.current.pageFlip().flipNext()}>Next</button>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="testimonials">
        <h2>What Our Users Say</h2>
        {[
          ["Komodo Hub has transformed our collaboration.", "— John Doe"],
          ["Intuitive and feature-rich platform!", "— Jane Smith"]
        ].map(([text, author], idx) => (
          <div key={idx} className="testimonial-card" style={{ '--delay': `${idx * 0.2}s` }}>
            <p>"{text}"</p>
            <h3>{author}</h3>
          </div>
        ))}
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join Komodo Hub today and unlock your potential.</p>
        <button className="cta-button">Sign Up Now</button>
      </AnimatedSection>
    </div>
  );
}

export default HomePage;