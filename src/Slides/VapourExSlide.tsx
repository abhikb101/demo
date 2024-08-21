import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { NoiseComp } from "./NoiseComp"; // Import the NoiseComp component

export const VapourExSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate the spring animation for the image
  const imageSpring = spring({
    frame,
    fps,
    from: 200, // Start 50px below
    to: 0, // End at its normal position
    config: {
      damping: 20,
      stiffness: 50,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {/* Noise Background */}
      <NoiseComp speed={0.005} circleRadius={5} maxOffset={50} />

      {/* Content Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          padding: "0 5%",
          position: "absolute", // Make sure this is positioned absolutely
          zIndex: 1, // Bring content in front of the background
          width: "100%", // Ensure content takes up full width
          height: "100%", // Ensure content takes up full height
        }}
      >
        {/* Left Side: Text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <h1
            style={{
              fontSize: 140,
              fontWeight: "bold",
              color: "#1C1C1C", // Dark color for text
              margin: 0,
              letterSpacing: "-3px", // Reduced letter spacing
            }}
          >
            VAPOUREX
          </h1>
          <h2
            style={{
              fontSize: 40,
              color: "#6B6B6B", // Lighter color for subheading
              marginTop: 10,
              lineHeight: 1.5,
              letterSpacing: "-1px", // Increased line height
            }}
          >
            Meme Coin Exchange
          </h2>
        </div>

        {/* Right Side: Phone Image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            transform: `translateY(${imageSpring}px)`, // Apply the spring animation
          }}
        >
          <Img
            src={require("../Assets/hero.png")}
            alt="Hero Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
