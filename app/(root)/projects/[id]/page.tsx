import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="flex items-center justify-center px-16 max-md:px-5 sm:py-10">
      <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10">
        <Image
          src="/assets/images/projectDetailsImage.png"
          alt="projectImage"
          width={1200}
          height={300}
          style={{ borderRadius: "20px" }}
        />
        <div className="flex lg:flex-row max-lg:flex-col gap-10 py-10 ">
          <div className=" flex-1">
            <h4 className="base-semibold mb-5">Website Design</h4>
            <h3 className="h2-bold mb-5">
              Philippine College of Physician Website Design
            </h3>
            <p className="paragraph-regular text-dark400_light900">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum
              (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
              book is a treatise on the theory of ethics, very popular during
              the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor
              sit amet.., comes from a line in section 1.10.32.
            </p>
          </div>{" "}
          <div className=" flex-1 flex-col ">
            <p className="h3-bold mb-5 mt-12">Project Information - </p>
            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col gap-8 w-[250px]">
                <div className="">
                  <p className="h3-bold text-primary-500 mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Website Design</Badge>
                  </div>
                </div>
                <div>
                  <p className="h3-bold text-primary-500 mb-2">Software</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Figma</Badge>
                    <Badge variant="secondary">Adobe Photoshop</Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8  w-[250px]">
                <div>
                  <p className="h3-bold text-primary-500 my-2">Date</p>
                  <p className="paragraph-medium text-dark400_light900">
                    Philippine College of Physicians
                  </p>
                </div>
                <div>
                  <p className="h3-bold text-primary-500 mb-2">Client</p>
                  <p className="paragraph-medium text-dark400_light900">
                    Philippine College of Physicians
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
