import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import {
  LockClosedIcon,
  LockOpen1Icon,
  LockOpen2Icon,
} from "@radix-ui/react-icons";
import type { PadlockProps } from "../../interfaces/PadlockProps";

const AnimatedPadlock = ({ step }: PadlockProps) => {
   const iconRef = useRef(null);

  useGSAP(
  () => {
    gsap.killTweensOf(iconRef.current);
    gsap.set(iconRef.current, { rotation: 0, y: 0 });

    switch (step) {
      case "closed":
        gsap.to(iconRef.current, {
          y: -5,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "power1.inOut",
        });
        break;

      case "semi":
        gsap.to(iconRef.current, {
          rotation: -10,
          duration: 0.3,
          ease: "power1.out",
        });
        break;

      case "open":
        gsap.to(iconRef.current, {
          rotation: -8,
          duration: 0.5,
          ease: "power2.out",
        });
        break;

      default:
        break;
    }
  },
  { dependencies: [step], scope: iconRef }
);

  return (
    <div ref={iconRef}>
      {step === "closed" && <LockClosedIcon width={42} height={42} />}
      {step === "semi" && <LockOpen1Icon width={42} height={42} />}
      {step === "open" && <LockOpen2Icon width={42} height={42} />}
    </div>
  );
};

export default AnimatedPadlock;
