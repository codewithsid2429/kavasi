'use client';

import * as React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-white/10 p-8 md:p-12 rounded-3xl mt-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-br from-[#6C63FF] to-[#00D9FF] bg-clip-text text-transparent">Terms of Service</h1>
        <p className="text-neutral-400 mb-6 font-semibold">Last updated: April 5, 2026</p>

        <div className="space-y-8 text-neutral-300 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and KAVASI ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, or mobile website related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the website and our agency services are our proprietary property. All source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") are owned or controlled by us or licensed to us. Custom AI and Web Development work done on behalf of clients is subject to explicit contract agreements defining intellectual property handovers upon final payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">3. Services Provided</h2>
            <p className="mb-2">KAVASI provides specialized services including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-400">
              <li>Full-stack Web Development</li>
              <li>AI Automation and Integration (e.g., custom Chatbots, workflow automation)</li>
              <li>Software maintenance and infrastructure deployment</li>
            </ul>
            <p className="mt-4">
              We reserve the right to refuse service, terminate client engagements, or cancel contracts at our sole discretion based on technical feasibility or policy violations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">4. User Representations</h2>
            <p>
              By using the KAVASI website, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity to comply with these terms; and (4) you will not use our platform for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">5. Limitation of Liability</h2>
            <p>
              In no event will KAVASI, its directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the website or our technical integrations as a service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">6. Governing Law</h2>
            <p>
              These Terms and your use of the website and services are governed by and construed in accordance with the laws of India. Any disputes shall be resolved in the jurisdiction encompassing our head office located in Lalitpur, Uttar Pradesh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
