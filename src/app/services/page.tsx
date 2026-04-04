export const metadata = {
  title: 'Services | KAVASI',
  description: 'Our top-tier web development and AI automation services.',
}

export default function ServicesPage() {
  const services = [
    {
      title: 'Full-Stack Web Development',
      desc: 'Robust, highly scalable web apps built with modern frameworks like Next.js, React, and Node.js. Optimized for unmatched performance and SEO.',
      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'AI Automation & Chatbots',
      desc: 'Smart, self-learning AI agents built to reduce operational costs and enhance user experience 24/7. Integrate GPT directly into your CRM.',
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Digital Marketing & Growth',
      desc: 'SEO, performance marketing, and conversion rate optimization metrics that give your agency a competitive edge in a crowded market.',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">Our Services</h1>
      <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16 text-lg">
        We deliver end-to-end solutions that elevate brands into industry leaders. 
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
            <div className="h-48 overflow-hidden">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">{s.title}</h2>
              <p className="text-neutral-400">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
