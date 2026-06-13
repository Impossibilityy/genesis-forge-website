import { SkipLink } from '@/components/layout/SkipLink';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Possibility } from '@/components/sections/Possibility';
import { Services } from '@/components/sections/Services';
import { Creations } from '@/components/sections/Creations';
import { Process } from '@/components/sections/Process';
import { WhyForge } from '@/components/sections/WhyForge';
import { Transformation } from '@/components/sections/Transformation';
import { About } from '@/components/sections/About';
import { Inquiry } from '@/components/sections/Inquiry';
import { LayerDivider } from '@/components/ui/LayerDivider';

/**
 * Single-page Genesis Forge site. Section order tells the story:
 * promise → reassurance → what we make → proof → how it works →
 * why us → transformation → who we are → start a project.
 */
export default function App() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <Possibility />
        <LayerDivider />
        <Services />
        <Creations />
        <Process />
        <WhyForge />
        <Transformation />
        <About />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
