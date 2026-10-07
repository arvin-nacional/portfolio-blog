import React from "react";
import Image from "next/image";
import Subscriber from "./forms/Subscriber";

const Footer = () => {
  return (
    <footer className="background-light850_dark100 flex items-center justify-center bg-dark-300 px-16 py-10 max-md:px-5">
      <div className="mt-14 flex w-full max-w-[1200px] flex-col gap-8 justify-between max-sm:mt-5 lg:flex-row">
        <div className="flex flex-col gap-5 pb-12">
          <Image
            src="/assets/images/primary-logo-light.svg"
            width={150}
            height={40}
            alt="Arvin Paul"
          />
          <p className="text-slate-300">
            Do you have a project in your mind? Let&apos;s connect!
          </p>
          <div className="flex gap-5">
            <a
              href="https://www.facebook.com/rvinpaul"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/icons/facebook.svg"
                width={20}
                height={20}
                alt="Facebook"
                // className="invert-colors"
              />
            </a>
            <a
              href="https://www.instagram.com/rvinpaul"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/icons/instagram.svg"
                width={20}
                height={20}
                alt="Instagram"
                // className="invert-colors"
              />
            </a>
            <a
              href="https://www.linkedin.com/rvinpaul"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/icons/linkedin.svg"
                width={20}
                height={20}
                alt="LinkedIn"
                // className="invert-colors"
              />
            </a>
          </div>
        </div>
        <div className="text-dark400_light800 pb-12">
          <p className="h3-bold text-white">Contact</p>
          <div className="body-regular text-slate-300">
            <div className=" mt-3 flex gap-5 ">
              <Image
                src="/assets/icons/telephone-call.png"
                width={20}
                height={20}
                alt=""
              />
              <a href="tel:+639659256451" className="hover:underline">
                +63 965 9256 451
              </a>
            </div>
            <div className="mt-3 flex gap-5 ">
              <Image
                src="/assets/icons/paper-plane.png"
                width={20}
                height={20}
                alt=""
              />
              <a href="mailto:arvin@rvinpaul.com" className="hover:underline">
                arvin@rvinpaul.com
              </a>
            </div>
            <div className="mt-3 flex gap-5 ">
              <Image
                src="/assets/icons/location-pin.png"
                width={20}
                height={20}
                alt=""
              />
              <p>Camarin, Caloocan City, Philippines</p>
            </div>
          </div>
        </div>
        <div className="pb-12">
          <p className="h3-bold text-white">Subscribe</p>
          <p className="small-regular mb-3 py-2 text-slate-300">
            Occasional articles and updates from my work.
          </p>
          <Subscriber type="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
