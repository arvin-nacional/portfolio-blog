import CTA from "@/components/shared/CTA";
import React from "react";

const page = () => {
  return (
    <section className="background-light850_dark100 w-full flex flex-col items-center px-16 pt-20 max-md:px-5 max-md:py-20">
      <div className="mb-10 flex w-[1200px] pb-6 max-md:mt-10 ">
        <div className="">
          <div>
            <h1 className="h1-bold text-dark300_light700  mt-10">
              Privacy Policy
            </h1>
            <p className="text-dark300_light700 mb-5">
              Last Updated: November 5, 2024
            </p>
            <p className="text-dark300_light700 paragraph-regular mb-5">
              Welcome to rvinpaul.com. We value your privacy and are committed
              to protecting your personal data. This Privacy Policy describes
              how we collect, use, and disclose your information when you use
              our website.
            </p>

            <h2 className="h2-semibold text-dark300_light700">
              1. Information We Collect
            </h2>
            <p className="paragraph-regular text-dark300_light700 mb-2 ml-10">
              We may collect personal data directly from you, including:
            </p>
            <ul className="text-dark300_light700 paragraph-regular  list-disc ml-20 mb-5">
              <li>Contact Information: Name, email address, phone number.</li>
              <li>
                Usage Data: Information about how you access and use the
                website.
              </li>
              <li>
                Cookies and Tracking Technologies: We use cookies to enhance
                user experience and collect analytics.
              </li>
            </ul>

            <h2 className="h2-semibold text-dark300_light700">
              2. How We Use Your Information
            </h2>
            <p className="paragraph-regular text-dark300_light700 mb-2 ml-10">
              We use your information to:
            </p>
            <ul className="text-dark300_light700 paragraph-regular  list-disc ml-20 mb-5">
              <li>Provide and maintain our services.</li>
              <li>
                Communicate with you, including responding to inquiries and
                updates.
              </li>
              <li>Improve our website and user experience.</li>
            </ul>

            <h2 className="h2-semibold text-dark300_light700">
              3. Information Sharing
            </h2>
            <p className="paragraph-regular text-dark300_light700 mb-2 ml-10">
              We do not sell or rent your personal data to third parties.
              However, we may share your information:
            </p>
            <ul className="text-dark300_light700 paragraph-regular  list-disc ml-20 mb-5">
              <li>
                With service providers who perform services on our behalf.
              </li>
              <li>
                If required by law or in response to a valid legal request.
              </li>
            </ul>

            <h2 className="h2-semibold text-dark300_light700">4. Security</h2>
            <p className="paragraph-regular text-dark300_light700 mb-5 ml-10">
              We implement reasonable security measures to protect your personal
              data. However, please be aware that no security measure is
              perfect, and we cannot guarantee absolute security.
            </p>

            <h2 className="h2-semibold text-dark300_light700">
              5. Your Rights
            </h2>
            <p className="paragraph-regular text-dark300_light700 mb-5 ml-10">
              Depending on your location, you may have the right to access,
              correct, or delete your personal information. To make such a
              request, please contact us at [your contact email].
            </p>

            <h2 className="h2-semibold text-dark300_light700">
              6. Changes to This Privacy Policy
            </h2>
            <p className="paragraph-regular text-dark300_light700 mb-2 ml-10">
              We may update our Privacy Policy from time to time. Any changes
              will be posted on this page, and we encourage you to review it
              periodically.
            </p>

            <p className="paragraph-regular text-dark300_light700 mb-2 ml-10">
              For questions about this Privacy Policy, contact us at
              inquiries@rvinpaul.com.
            </p>
          </div>
        </div>
      </div>
      <CTA />
    </section>
  );
};

export default page;
