import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { MaskContainer } from "./ui/svg-mask-effect";

const Hero = () => {
  return (
    <div className="flex-center background-light850_dark100 w-full">
      <div className="w-full sm:px-12  xl:w-[1400px]">
        <MaskContainer
          revealText={
            <div className="flex-col">
              <h1 className="text-dark500_light700 text-8xl font-extrabold leading-tight">
                Elevate your <br /> Brand
              </h1>
              <h2 className="text-dark500_light700 mt-2 text-5xl font-normal leading-tight lg:mb-12">
                Design, Develop, Dominate
              </h2>
              <div className="flex-between mt-9 w-full">
                <Button className="primary-gradient absolute z-20 w-fit cursor-pointer rounded-3xl px-9 font-light !text-light-900 max-sm:mt-[200px]">
                  {" "}
                  Connect with me
                </Button>

                <div className=" ml-auto flex gap-5">
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
          <div className="flex-between mt-14 ">
            {/* <Button className="primary-gradient w-fit rounded-3xl px-9 font-light !text-light-900">
              {" "}
              Connect with me
            </Button> */}
            {/* <div className="flex-center gap-5">
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
            </div> */}
          </div>
        </MaskContainer>
      </div>
    </div>
  );
};

export default Hero;
