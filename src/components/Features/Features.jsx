import React from 'react';
import '../../styles/components/Features.css';

// ---
// Features data array
// To add/remove features, simply edit this array.
// Each feature should have an icon, title, and description.
// ---
import strategicConsultingIcon from '../../assets/images/icons/StrategicConsulting.jpg';
import digitalTransformationIcon from '../../assets/images/icons/DigitalTransformation.jpg';
import perfomanceOptimizationIcon from '../../assets/images/icons/PerfomanceOptimization.jpg';

const features = [
  {
    icon: strategicConsultingIcon,
    title: 'Strategic Consulting',
    description: 'Gain clarity and direction with expert insights into market dynamics, operational efficiency, and future-proof strategies.',
  },
  {
    icon: digitalTransformationIcon,
    title: 'Digital Transformation',
    description: 'Leverage cutting-edge technology and seamless integration to modernize your operations and enhance user experience.',
  },
  {
    icon: perfomanceOptimizationIcon,
    title: 'Performance Optimization',
    description: 'Unlock peak efficiency and maximize ROI through data-driven analysis and continuous improvement methodologies.',
  },
  // ---
  // To add a new feature, copy the object above and update the icon, title, and description.
  // ---
];

const Features = () => (
  <section className="features-section">
    {/* Features Section: Edit features in the array above */}
    {features.map((feature, idx) => (
      <article className="feature-card" key={idx}>
        <img src={feature.icon} alt={feature.title} className="feature-icon" loading="lazy" />
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-description">{feature.description}</p>
      </article>
    ))}
  </section>
);

export default Features;