import { AbsoluteFill, useCurrentFrame, spring } from "remotion";

const lightenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1).toUpperCase()}`;
};

export const ProblemSlide: React.FC<{ brandColor: string }> = ({
  brandColor,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        }}
      >
        Struggling to trade meme coins in India?
      </h1>
      <h1
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "white",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Limited options. No control.
      </h1>
    </AbsoluteFill>
  );
};

export const SolutionSlide: React.FC<{ brandColor: string }> = ({
  brandColor,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brandColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: 80,
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}
      >
        Introducing VapourEx
      </h1>
      <h1
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "black",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        The Meme Coin Exchange for India
      </h1>
    </AbsoluteFill>
  );
};

export const UsageSlide: React.FC<{ brandColor: string }> = () => {
  const frame = useCurrentFrame();

  // Frame ranges for different stages
  const solanaFrame = 0;
  const baseFrame = 30;
  const tonFrame = 60;
  const shrinkFrame = 90;
  const typingFrame = 120;

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
  const typingText = "We got you covered";
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
            }}
          >
            {typingText.substring(0, typedTextLength)}
          </h1>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const MarketSlide: React.FC<{ brandColor: string }> = ({
  brandColor,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        }}
      >
        Meme Coins: 50% of India’s altcoin market
      </h1>
      <h1
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: brandColor,
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        VapourEx: Empowering the next generation of traders
      </h1>
    </AbsoluteFill>
  );
};

export const ConclusionSlide: React.FC<{ brandColor: string }> = ({
  brandColor,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brandColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: 80,
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}
      >
        Join the Meme Coin Revolution with VapourEx
      </h1>
      <h1
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "black",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Start trading today
      </h1>
    </AbsoluteFill>
  );
};
