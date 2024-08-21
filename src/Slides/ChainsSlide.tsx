import { AbsoluteFill, useCurrentFrame, spring } from "remotion";
import { lightenColor } from "../utils";

export const ChainsSlide: React.FC<{ brandColor: string }> = () => {
  const frame = useCurrentFrame();

  // Frame ranges for different stages
  const solanaFrame = 0;
  const baseFrame = 45;
  const tonFrame = 85;
  const shrinkFrame = 120;
  const typingFrame = 140;

  // Colors for each coin
  const solanaColor = "#9945FF"; // Purple for Solana
  const baseColor = "#0052FF"; // Coinbase blue
  const tonColor = "#0088CC"; // Telegram blue

  // Determine the current background color based on the frame number
  let backgroundColor = solanaColor;
  let currentText = "Solana?";
  if (frame >= baseFrame && frame < tonFrame) {
    backgroundColor = baseColor;
    currentText = "Base?";
  } else if (frame >= tonFrame) {
    backgroundColor = tonColor;
    currentText = "Ton?";
  }

  // Horizontal shrinking effect for the final layout
  const tonWidthScale =
    frame > shrinkFrame
      ? spring({
          frame: frame - shrinkFrame,
          fps: 30,
          config: {
            damping: 100,
            stiffness: 200,
          },
        })
      : 1;

  // Visibility logic for other coins
  const isSolanaVisible = frame > shrinkFrame;
  const isBaseVisible = frame > shrinkFrame;

  // Typing effect for "We got you covered"
  const typingText = "We got you covered!";
  const typedTextLength = Math.min(
    typingText.length,
    Math.floor((frame - typingFrame) / 2)
  );
  const isTypingVisible = frame > typingFrame;

  // Silver gradient background with the current color overlay
  const gradientBackground = `linear-gradient(135deg, ${backgroundColor}, ${lightenColor(backgroundColor, 40)})`;

  return (
    <AbsoluteFill
      style={{
        background: gradientBackground,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Coin Text with shrinking effect */}
      <div
        style={{
          width: `${tonWidthScale * 33.33}%`, // Shrink horizontally
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: "bold",
            color: "white",
            filter: "drop-shadow(0px 60px 50px rgba(0, 0, 0, 0.5))", // Shadow 30px below the text
          }}
        >
          {currentText}
        </h1>
      </div>

      {/* Solana Text appears after shrinking */}
      {isSolanaVisible && (
        <div
          style={{
            width: "33.33%",
            height: "100%",
            position: "absolute",
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(135deg, ${solanaColor}, ${lightenColor(solanaColor, 40)})`,
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: "bold",
              color: "white",
              filter: "drop-shadow(0px 60px 50px rgba(0, 0, 0, 0.5))", // Shadow 30px below the text
            }}
          >
            Solana?
          </h1>
        </div>
      )}

      {/* Base Text appears after shrinking */}
      {isBaseVisible && (
        <div
          style={{
            width: "33.33%",
            height: "100%",
            position: "absolute",
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(135deg, ${baseColor}, ${lightenColor(baseColor, 40)})`,
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: "bold",
              color: "white",
              filter: "drop-shadow(0px 60px 50px rgba(0, 0, 0, 0.5))", // Shadow 30px below the text
            }}
          >
            Base?
          </h1>
        </div>
      )}

      {/* Typing effect for "We got you covered" */}
      {isTypingVisible && (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            marginTop: "150px",
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: "white",
              whiteSpace: "nowrap",
              overflow: "hidden",
              borderRight: "4px solid white",
              paddingRight: "10px",
              animation: "blink-caret 0.75s step-end infinite",
              filter: "drop-shadow(0px 60px 50px rgba(0, 0, 0, 0.5))", // Shadow 30px below the text
            }}
          >
            {typingText.substring(0, typedTextLength)}
          </h1>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
