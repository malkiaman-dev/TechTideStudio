import React from "react";

export default function TermsOfService() {
  return (
    <div className="text-white">
      <p className="text-white/50 text-sm mb-8">Last Updated: April 2026</p>

      <div className="space-y-8 text-white/80 leading-relaxed">
        <p>
          Welcome to TechTide Studio. By accessing or using our website and
          services, you agree to these Terms of Service.
        </p>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">1. Services</h3>
          <p>
            We provide web development, design, marketing, and digital
            solutions tailored to businesses and individuals.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            2. Client Responsibilities
          </h3>
          <p>
            Clients are responsible for providing accurate information,
            required content, approvals, and timely feedback needed for the
            successful delivery of a project.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">3. Payments</h3>
          <p>
            Payments must be made according to agreed project terms. Delayed
            payments may affect timelines, delivery schedules, or support.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            4. Intellectual Property
          </h3>
          <p>
            Final approved work becomes the client’s property upon full
            payment, unless otherwise stated in a separate written agreement.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            5. Limitation of Liability
          </h3>
          <p>
            TechTide Studio shall not be liable for indirect, incidental, or
            consequential damages arising from the use of our website or
            services.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">6. Changes</h3>
          <p>
            We may update these terms from time to time. Continued use of our
            website or services after updates means you accept the revised
            terms.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            7. Contact Us
          </h3>
          <p>
            For questions regarding these Terms of Service, contact us at{" "}
            <span className="text-[#089ff1]">info@techtidestudio.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
}