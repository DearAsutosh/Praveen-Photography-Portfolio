import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [trailing, setTrailing] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(false); // NEW
  const rafRef = useRef();

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Hide the native cursor
  useEffect(() => {
    if (!isTouch) {
      document.body.style.cursor = "none";
      return () => {
        document.body.style.cursor = "";
      };
    }
  }, [isTouch]);

  // Cursor position
  useEffect(() => {
    const move = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Trailing effect
  useEffect(() => {
    const animate = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [position]);

  // Hover effect for interactive elements
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest("a,button,[role=button],input,textarea")) setHovered(true);
    };
    const handleMouseOut = (e) => {
      if (e.target.closest("a,button,[role=button],input,textarea")) setHovered(false);
    };
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // Click animation
  useEffect(() => {
    const handleDown = () => setClicked(true);
    const handleUp = () => setClicked(false);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  if (isTouch) return null; // <--- Don't render on mobile/touch

  return (
    <AnimatePresence>
      {/* Main Cursor */}
      <motion.div
        key="cursor"
        initial={false}
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: hovered ? 1.5 : clicked ? 0.8 : 1,
          backgroundColor: hovered ? "rgba(255,255,255,0.18)" : "#fff",
          borderColor: hovered ? "rgba(255,255,255,0.7)" : "#333",
          boxShadow: hovered
            ? "0 0 16px 4px rgba(255,255,255,0.18)"
            : "0 2px 8px 0 #0002",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "2px solid #333",
          background: "#fff",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />

      {/* Trailing Dot */}
      <motion.div
        key="trailing"
        initial={false}
        animate={{
          x: trailing.x - 6,
          y: trailing.y - 6,
          scale: hovered ? 1.2 : 1,
          opacity: 0.7,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: hovered ? "rgba(255,255,255,0.7)" : "#fff",
          pointerEvents: "none",
          zIndex: 9998,
          filter: "blur(1px)",
        }}
      />

      {/* Cursor Ring */}
      <motion.div
        key="ring"
        initial={false}
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: hovered ? 1.8 : clicked ? 0.7 : 1,
          borderColor: hovered ? "rgba(255,255,255,0.7)" : "#333",
          opacity: hovered ? 0.5 : 0.25,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "2px solid #333",
          pointerEvents: "none",
          zIndex: 9997,
          background: "transparent",
        }}
      />
    </AnimatePresence>
  );
};

export default AnimatedCursor;