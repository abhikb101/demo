import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide, SlideDirection } from "@remotion/transitions/slide";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { useVideoConfig } from "remotion";
import { AbsoluteFill, Audio, staticFile } from "remotion";

import { slidesConfig } from "./slidesConfig";

export const SlideFlow: React.FC<{ brandColor: string }> = ({ brandColor }) => {
  const { width, height } = useVideoConfig();

  const getSlideDirection = (transition: string): SlideDirection => {
    switch (transition) {
      case "slideIn":
        return "from-left";
      case "slideUp":
        return "from-bottom";

      default:
        return "from-left"; // Default direction
    }
  };

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio.mp3")} startFrom={45}/>

      <TransitionSeries>
        {slidesConfig.map((config, index) => {
          const SlideComponent = config.slide;

          return (
            <React.Fragment key={index}>
              {/* Render each slide with its duration */}
              <TransitionSeries.Sequence durationInFrames={config.duration}>
                <SlideComponent brandColor={brandColor} />
              </TransitionSeries.Sequence>

              {/* Apply transition to the next slide if it exists */}
              {index < slidesConfig.length - 1 && (
                <TransitionSeries.Transition
                  presentation={
                    config.transition == "clockSwipe"
                      ? clockWipe({ width, height })
                      : slide({
                          direction: getSlideDirection(config.transition),
                        })
                  }
                  timing={linearTiming({
                    durationInFrames: config.transitionDuration || 15,
                  })}
                />
              )}
            </React.Fragment>
          );
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
