import { Hero } from "./components/wedding/Hero";
import { CouplePhotos } from "./components/wedding/CouplePhotos";
import { OurJourney } from "./components/wedding/OurJourney";
import { EventDetails } from "./components/wedding/EventDetails";
import { RSVPForm } from "./components/wedding/RSVPForm";
import { AdditionalInfo } from "./components/wedding/AdditionalInfo";
import { Footer } from "./components/wedding/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Hero />
      <CouplePhotos />
      <OurJourney />
      <EventDetails />
      <RSVPForm />
      <AdditionalInfo />
      <Footer />
    </div>
  );
}
