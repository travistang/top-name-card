import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  testId?: string;
  onAppear?: () => void;
};
export const FormSection = ({ onAppear, title, testId, children }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!onAppear || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onAppear();
          observer.disconnect(); // Stop observing once triggered
        }
      },
      { threshold: 0.8 } // Adjust threshold as needed
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [onAppear]);

  return (
    <motion.div
      ref={sectionRef}
      data-testid={testId}
      className="snap-start  px-4 py-2 rounded-lg flex flex-col gap-2 bg-slate shadow-lg w-full flex-shrink-0"
    >
      <h6 className="text-xs pl-1">{title}</h6>
      {children}
    </motion.div>
  );
};
