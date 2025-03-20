import React, { useState, useEffect, useRef } from 'react';
import './FAQ.css';
import { PrimeIcons } from 'primereact/api';
import BackgroundImage from '/src/assets/images/282-Searching-For-Answers.svg';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to detect when the FAQ section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (faqSectionRef.current) {
      observer.observe(faqSectionRef.current);
    }

    return () => {
      if (faqSectionRef.current) {
        observer.unobserve(faqSectionRef.current);
      }
    };
  }, []);

  const faqItems = [
    {
      question: "What is Komodo Hub?",
      answer: "Komodo Hub is a digital platform developed by Yayasan Komodo to support community-driven conservation efforts for Indonesia's endangered endemic species. It provides tools and resources for education, exploration, and protection of these species.",
    },
    {
      question: "Who can use Komodo Hub?",
      answer: "Komodo Hub is designed for individuals, schools, and communities across Indonesia. Both registered and non-registered users can access its features, though registration unlocks additional tools and capabilities.",
    },
    {
      question: "What features does Komodo Hub offer?",
      answer: "Komodo Hub includes a knowledge base on endangered species, interactive learning materials, games, tools for reporting sightings, and the ability for registered users to contribute to its library.",
    },
    {
      question: "How does Komodo Hub protect user data?",
      answer: "Komodo Hub prioritizes data security by employing encryption, authentication methods, strict access controls, and compliance with privacy regulations, especially for sensitive information like children's data.",
    },
    {
      question: "How can schools use Komodo Hub?",
      answer: "Schools can create profiles, manage student enrollment in programs, and develop conservation-related content. Teachers can integrate Komodo Hub into their syllabi and assess student progress through its tools.",
    },
    {
      question: "How can communities contribute through Komodo Hub?",
      answer: "Communities can share articles, essays, sighting reports, and other contributions to expand Komodo Hub's library. They also have dedicated library pages where their efforts are showcased publicly.",
    },
    {
      question: "Is Komodo Hub scalable for growing user demand?",
      answer: "Yes, Komodo Hub operates on a scalable platform that adapts to increasing user demands without requiring investment in physical infrastructure like servers or storage facilities.",
    },
    {
      question: "What programs are available through Komodo Hub?",
      answer: "Komodo Hub offers programs at internal, local, regional, and national levels focused on conservation education and activities such as species sighting reports.",
    },
    {
      question: "What kind of support is there for users of Komodo Hub?",
      answer: "Yayasan Komodo provides comprehensive support including documentation, tutorials, and assistance for schools and communities using Komodo Hub.",
    },
    {
      question: "How can I subscribe or get involved with Komodo Hub?",
      answer: "Schools or communities interested in using Komodo Hub can contact Yayasan Komodo. The system administrator will assist with account registration and onboarding to ensure a smooth experience.",
    },
  ];
  
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" ref={faqSectionRef}>
      {/* Background Image */}
      <div className={`faq-background ${isVisible ? 'visible' : ''}`}>
        <img src={BackgroundImage} alt="Searching for Answers" />
      </div>

      {/* FAQ Content */}
      <div className="faq-content">
        <h1>FAQs</h1>
        <p className="subheading">Common questions about Komodo Hub.</p>
        <div className="faq-grid">
          {faqItems.map((item, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
                <span>{item.question}</span>
                <i
                  className="pi pi-plus"
                  style={{ fontSize: '1.2rem', transition: 'transform 0.3s ease' }}
                ></i>
              </div>
              <div className="faq-answer-container">
                <div className="faq-answer">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;