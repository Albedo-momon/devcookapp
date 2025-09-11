import CustomSignIn from '@/components/CustomSignIn';
import ParticleText from '@/components/ParticleText';

export default function SignInPage() {
  return (
    <div className="relative flex justify-center min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/9694443-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/80 z-10"></div>

      {/* Animated Particle Text */}
      <div className="absolute top-1/2 sm:top-30 md:top-28 lg:top-30 z-11 w-[80%]  flex  justify-center px-4">
        <ParticleText
          text="Devcook"
          className="scale-[1.2] sm:scale-[1.5] md:scale-[2] lg:scale-[2.5] opacity-70 sm:opacity-75 md:opacity-80"
        />
      </div>

      {/* Sign In Component */}
      <div className="relative z-20">
        <CustomSignIn />
      </div>
    </div>
  );
}