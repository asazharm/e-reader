export const getReaderAppearance = (brightness: number) => {
  switch (brightness) {
    case 10:
      return { color: "rgb(0, 0, 0)", bg: "rgb(255, 255, 255)" };
    case 9:
      return { color: "rgb(0, 0, 0)", bg: "rgb(250, 248, 242)" };
    case 8:
      return { color: "rgb(0, 0, 0)", bg: "rgb(246, 240, 229)" };
    case 7:
      return { color: "rgb(0, 0, 0)", bg: "rgb(241, 233, 216)" };
    case 6:
      return { color: "rgb(0, 0, 0)", bg: "rgb(237, 225, 203)" };
    case 5:
      return { color: "rgb(0, 0, 0)", bg: "rgb(232, 218, 190)" };
    case 4:
      return { color: "rgb(255, 255, 255)", bg: "rgb(0, 0, 0)" };
    case 3:
      return { color: "rgb(173, 173, 173)", bg: "rgb(0, 0, 0)" };
    case 2:
      return { color: "rgb(133, 133, 133)", bg: "rgb(0, 0, 0)" };
    case 1:
      return { color: "rgb(103, 103, 103)", bg: "rgb(0, 0, 0)" };
    default:
      return { color: "rgb(0, 0, 0)", bg: "rgb(255, 255, 255)" };
  }
};
