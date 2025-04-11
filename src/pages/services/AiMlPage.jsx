import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaRobot, FaBrain, FaChartLine, FaDatabase, FaCode, FaServer } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';

const AiMlPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaBrain className="text-4xl text-conison-magenta" />,
      title: 'AI Integration',
      description: 'Seamlessly integrate artificial intelligence into your existing systems and workflows.',
      applications: ['Predictive Analytics', 'Process Automation', 'Intelligent Recommendations', 'Decision Support']
    },
    {
      icon: <FaRobot className="text-4xl text-conison-magenta" />,
      title: 'Machine Learning Solutions',
      description: 'Develop custom machine learning models tailored to your specific business challenges.',
      applications: ['Pattern Recognition', 'Anomaly Detection', 'Classification Systems', 'Predictive Maintenance']
    },
    {
      icon: <FaChartLine className="text-4xl text-conison-magenta" />,
      title: 'Data Analytics',
      description: 'Extract valuable insights from your data with advanced analytics and visualization tools.',
      applications: ['Business Intelligence', 'Customer Behavior Analysis', 'Market Trends', 'Performance Metrics']
    },
    {
      icon: <FaCode className="text-4xl text-conison-magenta" />,
      title: 'Natural Language Processing',
      description: 'Enable your systems to understand, interpret, and generate human language.',
      applications: ['Chatbots', 'Sentiment Analysis', 'Content Summarization', 'Language Translation']
    }
  ];

  const useCases = [
    {
      industry: 'Healthcare',
      applications: [
        'Disease Diagnosis and Prediction',
        'Medical Image Analysis',
        'Patient Monitoring Systems',
        'Drug Discovery and Development'
      ]
    },
    {
      industry: 'Finance',
      applications: [
        'Fraud Detection',
        'Risk Assessment',
        'Algorithmic Trading',
        'Customer Service Automation'
      ]
    },
    {
      industry: 'Retail',
      applications: [
        'Inventory Management',
        'Customer Segmentation',
        'Personalized Recommendations',
        'Demand Forecasting'
      ]
    },
    {
      industry: 'Manufacturing',
      applications: [
        'Quality Control',
        'Supply Chain Optimization',
        'Predictive Maintenance',
        'Production Planning'
      ]
    }
  ];

  const process = [
    {
      title: 'Discovery',
      description: 'We analyze your business needs and identify opportunities for AI/ML implementation.',
      steps: [
        'Business Requirements Analysis',
        'Data Assessment',
        'Opportunity Identification',
        'Solution Planning'
      ]
    },
    {
      title: 'Data Preparation',
      description: 'We collect, clean, and prepare your data for AI/ML model development.',
      steps: [
        'Data Collection',
        'Data Cleaning',
        'Feature Selection',
        'Data Transformation'
      ]
    },
    {
      title: 'Model Development',
      description: 'We build and train custom AI/ML models based on your specific requirements.',
      steps: [
        'Algorithm Selection',
        'Model Training',
        'Hyperparameter Tuning',
        'Performance Evaluation'
      ]
    },
    {
      title: 'Implementation',
      description: 'We integrate the AI/ML solutions into your existing infrastructure and workflows.',
      steps: [
        'System Integration',
        'API Development',
        'User Interface Design',
        'Deployment'
      ]
    },
    {
      title: 'Monitoring & Optimization',
      description: 'We continuously monitor and improve the performance of your AI/ML solutions.',
      steps: [
        'Performance Monitoring',
        'Model Retraining',
        'Feature Engineering',
        'Continuous Improvement'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Hero Section with Particles */}
      <section className="relative py-20">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-conison-magenta/20 to-conison-magenta/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI & <span className="text-conison-magenta">Machine Learning</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Leverage the power of artificial intelligence and machine learning to transform your business with intelligent, data-driven solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI & ML Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {service.description}
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Applications:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.applications.map((application, appIndex) => (
                      <li key={appIndex} className="flex items-start">
                        <span className="h-2 w-2 rounded-full bg-conison-magenta mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-sm">{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI & ML Process</h2>
          <div className="relative">
            {/* Connector Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-conison-magenta transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Process Steps */}
            <div className="space-y-12 relative">
              {process.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {step.description}
                        </p>
                        <ul className="mt-3 space-y-1">
                          {step.steps.map((substep, idx) => (
                            <li key={idx} className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {substep}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:w-12 flex justify-center items-center relative z-10">
                        <div className="w-12 h-12 rounded-full bg-conison-magenta flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                      <div className="md:w-12 flex justify-center items-center relative z-10">
                        <div className="w-12 h-12 rounded-full bg-conison-magenta flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {step.description}
                        </p>
                        <ul className="mt-3 space-y-1">
                          {step.steps.map((substep, idx) => (
                            <li key={idx} className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {substep}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Industry Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}
              >
                <h3 className="text-xl font-semibold mb-4 text-conison-magenta">{useCase.industry}</h3>
                <ul className="space-y-2">
                  {useCase.applications.map((application, appIndex) => (
                    <li key={appIndex} className="flex items-start">
                      <span className="h-2 w-2 rounded-full bg-conison-magenta mt-1.5 mr-2 flex-shrink-0"></span>
                      <span className="text-sm">{application}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mb-4">
                <FaCode className="text-4xl text-conison-magenta mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI/ML Frameworks</h3>
              <ul className="space-y-2">
                <li>TensorFlow</li>
                <li>PyTorch</li>
                <li>Scikit-learn</li>
                <li>Keras</li>
                <li>Azure ML</li>
                <li>Google AI Platform</li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mb-4">
                <FaDatabase className="text-4xl text-conison-magenta mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Big Data Technologies</h3>
              <ul className="space-y-2">
                <li>Apache Hadoop</li>
                <li>Apache Spark</li>
                <li>MongoDB</li>
                <li>Amazon Redshift</li>
                <li>Google BigQuery</li>
                <li>Azure Synapse</li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mb-4">
                <FaServer className="text-4xl text-conison-magenta mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cloud Platforms</h3>
              <ul className="space-y-2">
                <li>AWS SageMaker</li>
                <li>Google Cloud AI</li>
                <li>Microsoft Azure AI</li>
                <li>IBM Watson</li>
                <li>OpenAI APIs</li>
                <li>Hugging Face</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Harness the Power of AI?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you unlock the potential of artificial intelligence and machine learning for your business.
          </p>
          <button 
            onClick={() => navigate('/quote-request')} 
            className="inline-block bg-conison-magenta text-white px-8 py-3 rounded-lg hover:bg-conison-magenta-dark transition-colors"
          >
            Get Started with AI
          </button>
        </div>
      </section>
    </div>
  );
};

export default AiMlPage; 