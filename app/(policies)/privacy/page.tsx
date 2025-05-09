"use client";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full text-[#000]">
        <div className="grid grid-cols-1 my-2 sm:my-6 w-[90%]">
          <div>
            <h1 className="sm:text-3xl text-2xl font-bold my-5 flex justify-center underline">
              Privacy Policy
            </h1>

            <div className="font-semibold text-lg mb-5">
              This website operates under Grovyo Ventures Pvt. Ltd.
            </div>

            <p className="font-thin text-[13px]">
              This Privacy Policy explains our policies and procedures regarding
              the collection, use, and disclosure of your information when you
              use our services. It also outlines your privacy rights and how
              applicable laws protect you.
            </p>

            <h1 className="text-xl font-bold py-5 underline">
              Interpretation and Definitions
            </h1>

            <h2 className="text-lg font-medium pb-3">Interpretation</h2>
            <p className="font-thin text-sm">
              Words with capitalized initials have specific meanings as defined
              below, applicable whether used in singular or plural form.
            </p>

            <h2 className="text-lg font-medium py-3">Definitions</h2>
            <ul className="flex flex-col gap-4 text-sm font-medium list-disc">
              <p>For the purposes of this Privacy Policy:</p>
              <li className="font-thin text-sm">
                <strong>Account:</strong> A unique account created for you to
                access our services or specific parts of them.
              </li>
              <li className="font-thin text-sm">
                <strong>Application:</strong> Refers to Grovyo, the software
                program provided by the Company.
              </li>
              <li className="font-thin text-sm">
                <strong>Company:</strong> Refers to Grovyo Ventures Pvt. Ltd.
              </li>
              <li className="font-thin text-sm">
                <strong>Cookies:</strong> Small files placed on your device to
                store browsing history and other information.
              </li>
              <li className="font-thin text-sm">
                <strong>Country:</strong> Refers to Uttar Pradesh, India.
              </li>
              <li className="font-thin text-sm">
                <strong>Device:</strong> Any device that can access our service,
                such as a computer, mobile phone, or tablet.
              </li>
              <li className="font-thin text-sm">
                <strong>Personal Data:</strong> Information that relates to an
                identified or identifiable individual.
              </li>
              <li className="font-thin text-sm">
                <strong>Service:</strong> Refers to the Application, Website, or
                both.
              </li>
              <li className="font-thin text-sm">
                <strong>Usage Data:</strong> Data collected automatically when
                using the service, such as duration of visits and click data.
              </li>
              <li className="font-thin text-sm">
                <strong>Website:</strong> Refers to Grovyo Workspace, accessible
                at{" "}
                <a
                  href="https://workspace.grovyo.com/"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  workspace.grovyo.com
                </a>
              </li>
              <li className="font-thin text-sm">
                <strong>You:</strong> The individual or entity accessing or
                using the service.
              </li>
            </ul>

            <h1 className="text-xl font-bold py-4 underline">
              Collecting and Using Your Personal Data
            </h1>

            <h2 className="text-lg font-semibold pb-3">
              Types of Data Collected
            </h2>

            <h3 className="text-sm font-bold py-2">Personal Data</h3>
            <ul className="flex flex-col gap-4 text-sm font-thin list-disc ml-4">
              <p>
                While using our service, we may request the following personally
                identifiable information:
              </p>
              <li>Email address</li>
              <li>Full name</li>
              <li>Phone number</li>
              <li>Business name and address (if applicable)</li>
              <li>Usage data, preferences, and device information</li>
            </ul>

            <h3 className="text-sm font-bold py-4">Usage Data</h3>
            <p className="font-thin text-sm">
              Usage Data is collected automatically and may include details such
              as your device’s IP address, browser type, browser version, pages
              visited, and time/date of visit.
            </p>

            <h1 className="text-xl font-bold py-5 underline">
              Use of Your Personal Data
            </h1>
            <ul className="flex flex-col gap-3 text-sm font-thin list-disc ml-4">
              <li>To provide and maintain our Service</li>
              <li>To manage Your Account and orders</li>
              <li>To respond to your inquiries and offer support</li>
              <li>To notify you about changes and updates</li>
              <li>
                To send you marketing and promotional content (with your
                consent)
              </li>
              <li>To comply with legal obligations</li>
            </ul>

            <h1 className="text-xl font-bold py-5 underline">
              Retention and Deletion
            </h1>
            <p className="font-thin text-sm">
              We retain your personal data only as long as necessary for the
              purposes set out in this policy. When data is no longer needed, it
              is securely deleted or anonymized.
            </p>

            <h1 className="text-xl font-bold py-5 underline">
              Your Data Protection Rights
            </h1>
            <ul className="flex flex-col gap-3 text-sm font-thin list-disc ml-4">
              <li>Right to access, update or delete your information</li>
              <li>Right to rectification</li>
              <li>Right to object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h1 className="text-xl font-bold py-5 underline">Contact Us</h1>
            <p className="font-thin text-sm">
              If you have any questions or concerns about this Privacy Policy,
              contact us at:{" "}
              <a
                href="mailto:support@grovyo.com"
                className="text-blue-600 underline"
              >
                support@grovyo.com
              </a>
            </p>

            <p className="font-thin text-[13px] mt-4">
              Last updated: May 9, 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
