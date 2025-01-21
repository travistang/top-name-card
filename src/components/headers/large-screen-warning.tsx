import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isLargeScreen?: boolean;
};
export const LargeScreenWarning = ({ isLargeScreen }: Props) => {
  return (
    <AnimatePresence>
      {isLargeScreen && (
        <motion.div
          initial={{ opacity: 0, y: -1000 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -1000 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="fixed left-0 top-0 right-0 shadow-lg px-2 py-1 inset gap-x-2 text-center bg-yellow-600 text-xl text-slate-dark"
        >
          <p>Your screen is too large for the best experience 🤯</p>{" "}
          <p>Try using this app on a phone 📱</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
