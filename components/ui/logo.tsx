import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        src="/assets/images/primary-logo-light.svg"
        width={150}
        height={40}
        alt="Arvin Paul"
      />
    </div>
  );
};

export default Logo;
