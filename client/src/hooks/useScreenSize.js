import { useMediaQuery } from "react-responsive";

const useScreenSize = () => {
  const isSM = useMediaQuery({ maxWidth: 640 });
  const isMD = useMediaQuery({ minWidth: 768 });
  const isXMD = useMediaQuery({maxWidth: 924})
  const isLG = useMediaQuery({ minWidth: 1024 });
  const isXL = useMediaQuery({ minWidth: 1280 });
  const is2XL = useMediaQuery({ minWidth: 1536 });
  const isMaxXL = useMediaQuery({maxWidth: 1280})

  return { isSM, isMD, isXMD, isLG, isXL, is2XL, isMaxXL };
};

export const useScreenWidth = {
  sm: 390,
  md: 768,
  xmd: 820,
  lg: 1024,
  xl: 1280,
};

export default useScreenSize;
