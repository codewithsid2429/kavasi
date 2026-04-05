'use client';

import * as React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-white/10 p-8 md:p-12 rounded-3xl mt-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-br from-white to-[#00D9FF] bg-clip-text text-transparent">Privacy Policy</h1>
        <p className="text-neutral-400 mb-6 font-semibold">Last updated: April 5, 2026</p>

        <div className="space-y-8 text-neutral-300 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">1. Introduction</h2>
            <p>
              Welcome to KAVASI ("we," "our," or "us"). We are an agency specializing in Web Development, Digital Systems, and AI Automation. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">2. Data We Collect</h2>
            <p className="mb-2">We may collect, use, store, and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-400">
              <li><strong>Identity Data:</strong> First name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> Billing address, email address, and telephone numbers.</li>
              <li><strong>Technical Data:</strong> Internet protocol (IP) address, your login data, browser type and version, time zone setting, and location.</li>
              <li><strong>Project Data:</strong> Information specifically related to the web development or AI automation projects we consult on behalf of our clients.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we use your data to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-neutral-400">
              <li>Provide our agency services including web development and AI integrations.</li>
              <li>Manage our professional relationship with you and your business.</li>
              <li>Improve our website, services, marketing, and customer experiences.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees, agents, and contractors who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">5. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at our Head Office in Lalitpur or our Branch in Lucknow, or email us via our official contact channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
