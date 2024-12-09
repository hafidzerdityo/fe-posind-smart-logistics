import React from "react";

const Hero = () => {
  return (
    <>
      <div className="hero bg-base-200 h-auto pt-24">
        <div className="hero-content text-center max-w-2xl mx-auto py-10">
          <div>
            {/* First paragraph */}
            <h1 className="text-5xl font-bold mb-4">
              PosIND Smart Logistics (Plastic)
            </h1>
            <p className="text-xl font-semibold">
              Maintain the functionality of your product during its useful
              lifetime with PosIND Supply Chain.
            </p>
            {/* Separator */}
            <hr className="my-2 border-t-2 border-gray-300 w-1/2 mx-auto" />
            {/* Second paragraph */}
            <p className="text-sm">
              We provide supply chain solutions across a range of industries,
              including food (frozen, chilled, and ambient), beverages, media
              and entertainment, and household goods. Our continuously expanding
              portfolio of services helps you address your most complex and
              urgent operational needs – from consulting, planning, and network
              design to manufacturing, packaging, and return logistics.
            </p>
            <button className="btn btn-primary text-white mt-6">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
