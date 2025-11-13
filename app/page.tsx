import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import MainSection from "./_components/MainSection";
import LowerBar from "./_components/LowerBar";

export default function Home() {
  return (
   <div className="min-h-screen pb-16">
     <Navbar />
     <HeroSection />
     <MainSection />
     <LowerBar />
   </div>
  );

}