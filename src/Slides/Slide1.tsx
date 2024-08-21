import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

export const Slide1: React.FC<{ brandColor: string }> = ({ brandColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Welcome" Bounce Animation
  const welcomeScale = spring({
    frame: frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  // Text and typing cursor
  const text = " to VapoureEx";
  const cursor = "|";

  // Calculate the width of the text container to simulate typing
  const textWidth =
    frame >= 30 && frame <= 90
      ? ((frame - 30) / 60) * 100
      : frame > 90
        ? 100
        : 0;

  // Adjusted font size and weight
  const fontSize = 144;
  const fontWeight = "bold";

  // Determine background color based on the frame number
  let backgroundColor = "black";
  let textColor = "#fff"; // Default text color is white
  if (frame >= 30 && frame < 90) {
    backgroundColor = brandColor;
    textColor = "#000"; // Change text to black when the background is the brand color
  } else if (frame >= 90) {
    backgroundColor = "black";
    textColor = "#fff"; // Revert text to white when the background is black
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* "Welcome" Text */}
        <h1
          style={{
            fontSize: fontSize,
            transform: `scale(${welcomeScale})`,
            margin: 0,
            fontWeight: fontWeight,
            color: textColor, // Text color changes based on background
            whiteSpace: "nowrap",
          }}
        >
          Welcome
        </h1>

        {/* "To VapoureEx" Smooth Typing Effect */}
        <div
          style={{
            fontSize: fontSize,
            fontWeight: fontWeight,
            whiteSpace: "nowrap",
            overflow: "hidden",
            color: textColor, // Text color changes based on background
            width: `${textWidth}%`, // Smoother typing transition
            borderRight: "2px solid", // Thinner typing cursor
            paddingRight: "5px",
            marginLeft: "30px",
          }}
        >
          {text.substring(0, Math.floor((textWidth / 100) * text.length))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
