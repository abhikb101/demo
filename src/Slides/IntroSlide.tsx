import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { darkenColor, lightenColor } from "../utils"; // Including the lightenColor import

export const IntroducingVapeMinerSlide: React.FC<{ brandColor: string }> = ({
  brandColor,
}) => {
  const frame = useCurrentFrame();

  // Colors for the background gradient
  const lighterBrandColor = lightenColor(brandColor, 30); // Lighter version of the brand color
  const darkBrandColor = darkenColor(brandColor, 30); // Darker version of the brand color

  // Faster sliding background animation completed in 45 frames
  const slideInPosition = interpolate(frame, [0, 55], [-100, 0], {
    extrapolateRight: "clamp",
  }); // Slide-in within 45 frames

  // Typing effect for "Introducing"
  const text = "Introducing";
  const typedTextLength = Math.min(text.length, Math.floor(frame / 5) + 4); // Complete typing within 45 frames

  return (
    <AbsoluteFill style={{ backgroundColor: "white", overflow: "hidden" }}>
      {/* Background gradient sliding in */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${darkBrandColor}, ${brandColor}, ${lighterBrandColor})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `translateX(${slideInPosition}%)`, // Start fully off-screen left and slide in
        }}
      />

      {/* Text with typing animation and silver gradient */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centering the text
          fontSize: 250, // Increased font size
          fontWeight: "bold",
          background:
            "linear-gradient(157deg, rgb(0 0 0), rgb(96 96 96), rgb(0 0 0))", // Specified silver gradient
          backgroundClip: "text",
          color: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          whiteSpace: "nowrap",
          overflow: "hidden",
          letterSpacing: "-3px", // Reduced letter spacing
        }}
      >
        {text.substring(0, typedTextLength)}
      </div>
    </AbsoluteFill>
  );
};
