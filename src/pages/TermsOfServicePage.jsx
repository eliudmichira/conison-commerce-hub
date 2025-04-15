import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const TermsOfServicePage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-primary text-white' : 'bg-white text-text-primary'}`}>
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Conison Technologies' services, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
            <p>
              Conison Technologies provides digital solutions including web development, branding, and digital marketing services. 
              The specific services and terms will be outlined in individual service agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
            <p>As a user of our services, you agree to:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use our services for any illegal purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <p>
              Payment terms will be specified in individual service agreements. Generally:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Payments are due as specified in the service agreement</li>
              <li>Late payments may incur additional charges</li>
              <li>Refund policies will be outlined in the service agreement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
            <p>
              All content and materials provided through our services are protected by intellectual property rights. 
              Users may not reproduce, distribute, or create derivative works without our permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <p>
              Conison Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use of or inability to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to our services at any time, without notice, 
              for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes 
              through our website or via email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
            <p>
              For any questions regarding these Terms of Service, please contact us at:
            </p>
            <p className="mt-4">
              Email: info@conisontechnologies.com<br />
              Phone: +211 920 504 110<br />
              Address: Juba, South Sudan
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 