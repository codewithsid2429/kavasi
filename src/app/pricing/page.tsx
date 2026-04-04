export const metadata = {
  title: 'Pricing | KAVASI',
  description: 'Transparent pricing for agencies and startups.',
}

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">Simple, Transparent Pricing</h1>
      <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16 text-lg">
        Exceptional digital solutions designed to scale with your business.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Starter */}
        <div className="bg-neutral-900 border border-white/10 p-8 rounded-3xl hover:border-white/30 transition-all">
          <h3 className="text-2xl font-bold mb-2">Starter</h3>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-50 to-neutral-500 mb-6">₹9,999</p>
          <ul className="space-y-4 mb-8 text-neutral-400">
            <li>✓ Modern Landing Page</li>
            <li>✓ Responsive Design</li>
            <li>✓ Contact Form</li>
            <li>✓ 1 Week Delivery</li>
          </ul>
          <a href="/contact?type=starter" className="block w-full py-3 text-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors font-semibold">
            Choose Starter
          </a>
        </div>

        {/* Business */}
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 border border-white/30 p-8 rounded-3xl transform md:-translate-y-4 shadow-2xl relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>
          <h3 className="text-2xl font-bold mb-2">Business</h3>
          <p className="text-3xl font-bold text-white mb-6">₹24,999</p>
          <ul className="space-y-4 mb-8 text-neutral-300">
            <li>✓ Full-Stack Web App</li>
            <li>✓ Dynamic Content / CMS</li>
            <li>✓ Performance Optimized</li>
            <li>✓ Advanced UI/UX Design</li>
          </ul>
          <a href="/contact?type=business" className="block w-full py-3 text-center bg-white text-black rounded-full hover:bg-neutral-200 transition-colors font-semibold">
            Choose Business
          </a>
        </div>

        {/* AI Automation */}
        <div className="bg-neutral-900 border border-white/10 p-8 rounded-3xl hover:border-white/30 transition-all">
          <h3 className="text-2xl font-bold mb-2">AI Automation</h3>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-50 to-neutral-500 mb-6">₹49,999</p>
          <ul className="space-y-4 mb-8 text-neutral-400">
            <li>✓ Everything in Business</li>
            <li>✓ Custom AI Chatbot</li>
            <li>✓ Automated Workflow Integration</li>
            <li>✓ 24/7 Dedicated Support</li>
          </ul>
          <a href="/contact?type=ai" className="block w-full py-3 text-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors font-semibold">
            Choose AI Automation
          </a>
        </div>
      </div>
    </div>
  );
}
