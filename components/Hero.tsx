import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { MaskContainer } from "./ui/svg-mask-effect";

const Hero = () => {
  return (
    <div className="flex-center background-light850_dark100 w-full">
      <div className="w-full sm:px-12">
        <MaskContainer
          revealText={
            <div className="flex-col">
              <h1 className="text-dark500_light700 text-8xl font-extrabold leading-tight">
                Elevate your <br /> Brand
              </h1>
              <h2 className="text-dark500_light700 mt-2 text-5xl font-normal leading-tight">
                Design, Develop, Dominate
              </h2>
              <div className="flex-between mt-9 w-full">
                <Button className="primary-gradient w-fit rounded-3xl px-9 font-light !text-light-900">
                  {" "}
                  Connect with me
                </Button>

                <div className="flex-center gap-5">
                  <Image
                    src="/assets/icons/arrow-up-left-contained.svg"
                    width={80}
                    height={80}
                    alt="icon "
                    className="invert-colors "
                  />
                  <h3 className="text-dark300_light700 paragraph-regular w-[440px]">
                    From captivating visuals to powerful functionality, we
                    empower your brand to stand out, leaving a lasting
                    impression and dominating your market.
                  </h3>
                </div>
              </div>
            </div>
          }
          className="flex-start w-full"
        >
          <h1 className="primary-text-gradient text-left text-8xl font-extrabold leading-tight">
            Elevate your <br /> Brand
          </h1>
          <h2 className="primary-text-gradient  mt-2 text-5xl font-normal leading-tight">
            Design, Develop, Dominate
          </h2>
          <div className="flex-between mt-9 w-full">
            <Button className="primary-gradient w-fit rounded-3xl px-9 font-light !text-light-900">
              {" "}
              Connect with me
            </Button>
            <div className="flex-center gap-5">
              <Image
                src="/assets/icons/arrow-up-left-contained.svg"
                width={80}
                height={80}
                alt="icon "
                className="invert-colors "
              />
              <h3 className="paragraph-regular w-[440px] text-light-700">
                From captivating visuals to powerful functionality, we empower
                your brand to stand out, leaving a lasting impression and
                dominating your market.
              </h3>
            </div>
          </div>
        </MaskContainer>
        {/* <h2 className="text-dark500_light700 mt-2 text-5xl font-normal leading-tight">
          Design, Develop, Dominate
        </h2>
        <div className="flex-between mt-9 w-full">
          <Button className="primary-gradient w-fit rounded-3xl px-9 font-light !text-light-900">
            {" "}
            Connect with me
          </Button>
          <div className="flex-center gap-5">
            <Image
              src="/assets/icons/arrow-up-left-contained.svg"
              width={80}
              height={80}
              alt="icon "
              className="invert-colors "
            />
            <h3 className="text-dark300_light700 w-[440px]">
              From captivating visuals to powerful functionality, we empower
              your brand to stand out, leaving a lasting impression and
              dominating your market.
            </h3>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
