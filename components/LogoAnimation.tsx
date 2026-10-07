const LogoAnimation = () => (
  <section
    aria-labelledby="branding-title"
    className="flex items-center justify-center px-6 py-16 sm:px-10 lg:px-16"
  >
    <div className="w-full max-w-[960px]">
      <h2
        id="branding-title"
        className="text-dark300_light700 mb-8 text-2xl font-bold sm:text-3xl"
      >
        Brand design in motion
      </h2>
      <video
        aria-label="Arvin Paul logo animation"
        className="aspect-video w-full rounded-2xl shadow-xl"
        preload="none"
        poster="/assets/images/thumbnail.jpg"
        controls
        playsInline
      >
        <source src="/assets/videos/logo_animation.mp4" type="video/mp4" />
        <a href="/assets/videos/logo_animation.mp4">Watch the logo animation</a>
      </video>
    </div>
  </section>
);
export default LogoAnimation;
