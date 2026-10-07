import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero2 = () => (
  <section className="relative flex min-h-[80svh] items-center justify-center bg-white px-6 pb-16 pt-32 dark:bg-black dark:bg-dot-white/[0.2] sm:px-10 lg:px-16">
    <div className="relative grid w-full max-w-[1200px] items-center gap-10 md:grid-cols-[1.5fr_1fr]">
      <div className="min-w-0">
        <p className="mb-4 text-sm font-semibold text-blue-700 dark:text-blue-300">
          Arvin Paul · Web developer & designer
        </p>
        <h1 className="text-dark500_light700 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
          Websites and design that help your business grow
        </h1>
        <p className="text-dark300_light700 mt-6 max-w-xl text-base leading-7 sm:text-lg">
          I help businesses build a clear online presence through custom
          websites, landing pages, and brand design — from the first idea to
          launch.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            asChild
            className="primary-gradient h-auto rounded-full px-7 py-3 !text-white"
          >
            <Link href="/contact">Discuss your project</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-dark300_light700 h-auto rounded-full border-blue-400 px-7 py-3"
          >
            <Link href="#projects">View my work</Link>
          </Button>
        </div>
      </div>
      <Image
        src="/assets/images/hero-image.svg"
        alt=""
        height={500}
        width={500}
        priority
        className="mx-auto h-auto w-full max-w-[400px]"
      />
    </div>
  </section>
);
export default Hero2;
