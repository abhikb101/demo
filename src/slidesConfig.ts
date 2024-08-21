import { ProblemSlide } from "./Slides/ConceptSlides";
import { IntroducingVapeMinerSlide } from "./Slides/IntroSlide";
import { ChainsSlide } from "./Slides/ChainsSlide";
import { VapourExSlide } from "./Slides/VapourExSlide";

export const slidesConfig = [
  {
    slide: IntroducingVapeMinerSlide,
    duration: 75,
    transition: "slideUp", // Add transition type
    transitionDuration: 15, // Specify transition duration
  },
  {
    slide: VapourExSlide,
    transition: "clockSwipe", // Slide transition upwards
    duration: 120,
    transitionDuration: 20,
  },
  {
    slide: ChainsSlide,
    transition: "clockSwipe", // Slide transition left
    duration: 200,
    transitionDuration: 15,
  },
  // Add more slides as needed
];
