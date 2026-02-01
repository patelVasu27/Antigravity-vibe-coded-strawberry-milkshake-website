import { LucideIcon, Leaf, Droplets, FlaskConical } from "lucide-react";

export default function Features() {
  return (
    <section className="bg-brand-black py-5 position-relative z-10">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-12 col-md-4">
            <FeatureCard 
              icon={Leaf} 
              title="Ethical Sourcing" 
              desc="Direct-trade berries from high-altitude microclimates. Hand-picked at dawn for maximum Brix." 
            />
          </div>
          <div className="col-12 col-md-4">
            <FeatureCard 
              icon={Droplets} 
              title="Texture Science" 
              desc="Our proprietary viscosity index ensures the 'Perfect Sip'—thick enough to linger, fluid enough to flow." 
            />
          </div>
          <div className="col-12 col-md-4">
            <FeatureCard 
              icon={FlaskConical} 
              title="Zero Additives" 
              desc="No gums, no stabilizers. Just pure physics, cold temperature, and molecular gastronomy." 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ icon: Icon, title, desc }: { icon: LucideIcon, title: string, desc: string }) => (
  <div className="flex flex-col gap-6 items-start group">
    <div className="p-4 rounded-full border border-white/10 group-hover:border-brand-pink/50 transition-colors duration-500">
      <Icon className="w-8 h-8 text-brand-pink" strokeWidth={1.5} />
    </div>
    <h3 className="font-serif text-3xl text-white">{title}</h3>
    <p className="font-sans text-gray-400 font-light leading-relaxed">{desc}</p>
  </div>
);
