import profileImage from "./profile.jpeg";
import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";

function ProfileImage() {
  const [active, setActive] = useState(false);
  const DURATION = 3000;
  const { svgAnim } = useSpring({
    loop: true,
    config: {
      duration: DURATION,
    },
    svgAnim: active ? 1 : 0,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setActive(!active);
    }, DURATION + 100);

    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="py-10">
      <div className="md:p-4 relative z-0">
        <img
          className="object-contain mx-auto h-40 rounded-full z-10 shadow-2xl"
          src={profileImage}
          alt="me"
        />
        <div className="absolute inset-0 max-w-md -z-10 mx-auto opacity-30">
          <svg id="visual" viewBox="0 0 450 200" version="1.1">
            <g transform="translate(224.84326207098945 84.6046077811243)">
              <animated.path
                d={svgAnim.to({
                  range: [0, 1],
                  output: [
                    "M42.9 -27.8C66.3 -4.9 103.4 13.6 105.8 32.6C108.2 51.7 76 71.3 41.8 88.5C7.5 105.7 -28.8 120.4 -57.2 110.1C-85.6 99.7 -106.2 64.3 -105.6 33.6C-105.1 2.9 -83.4 -23.2 -62.3 -45.5C-41.2 -67.8 -20.6 -86.4 -5.4 -82.1C9.8 -77.8 19.6 -50.6 42.9 -27.8",
                    "M74.4 -64.6C80.5 -51.7 58.5 -21.7 49.1 7.9C39.7 37.4 42.9 66.5 25.9 87.6C9 108.7 -28.1 121.9 -58.5 111.2C-88.9 100.5 -112.7 65.8 -114.6 33.1C-116.5 0.4 -96.6 -30.4 -73.8 -47C-51.1 -63.7 -25.5 -66.4 4.3 -69.8C34.1 -73.2 68.3 -77.5 74.4 -64.6",
                  ],
                })}
                fill="#3767ec"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
