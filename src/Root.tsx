import { Composition } from "remotion";
import { SlideFlow } from "./SlideFlow";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/norwester";
import "@fontsource-variable/source-code-pro";
import "./global.css";
import "@fontsource/roboto"; // Defaults to weight 400
// Supports weights 100-900
import "@fontsource-variable/montserrat";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SlideFlow"
        component={SlideFlow}
        durationInFrames={360}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          brandColor: "#C3FC49",
        }}
      />
    </>
  );
};
