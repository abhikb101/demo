// transitions.ts
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  Easing,
} from "remotion";

export const SlideInTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const translateX = interpolate(frame, [0, 35], [-200, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.68, -0.55, 0.27, 1.55), // Snappy easing
  });

  return (
    <AbsoluteFill style={{ transform: `translateX(${translateX}%)` }}>
      {children}
    </AbsoluteFill>
  );
};

export const ScaleFadeTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const scale = spring({
    frame,
    fps: 30,
    config: {
      damping: 100,
      stiffness: 300,
    },
  });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.68, -0.55, 0.27, 1.55), // Snappy easing
  });

  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

export const WipeTransition: React.FC<{
  children: React.ReactNode;
  color: string;
}> = ({ children, color }) => {
  const frame = useCurrentFrame();
  const wipePosition = interpolate(frame, [0, 15], [-1920, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.68, -0.55, 0.27, 1.55), // Snappy easing
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundColor: color,
          width: "100%",
          height: "100%",
          position: "absolute",
          transform: `translateX(${wipePosition}px)`,
          zIndex: 2,
        }}
      />
      <AbsoluteFill style={{ zIndex: 1 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SlideUpTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();

  // Current slide moving up
  const moveUpCurrentSlide = interpolate(frame, [0, 20], [0, -100], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.68, -0.55, 0.27, 1.55), // Snappy easing
  });

  // New slide coming from the bottom
  const moveUpNewSlide = interpolate(frame, [20, 40], [100, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.68, -0.55, 0.27, 1.55), // Snappy easing
  });

  return (
    <AbsoluteFill>
      {/* Move up the current slide */}
      <AbsoluteFill style={{ transform: `translateY(${moveUpCurrentSlide}%)` }}>
        {/* This will be the content of the current slide */}
        {children}
      </AbsoluteFill>
      {/* New slide entering from the bottom */}
      <AbsoluteFill
        style={{ transform: `translateY(${moveUpNewSlide}%)`, zIndex: 1 }}
      >
        {/* This will be the content of the new slide */}
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
