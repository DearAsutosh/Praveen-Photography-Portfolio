import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// Dynamically import all images from the captures folder
const images = import.meta.glob(
  "../../assets/images/captures/*.{jpg,jpeg,png,gif,webp}",
  { eager: true }
);

const allImages = Object.entries(images).map(([path, mod]) => ({
  id: path.split("/").pop(),
  src: mod.default,
}));

const IMAGES_PER_LOAD = 12;

export function MasonryGridGallery() {
  const [visibleImages, setVisibleImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(IMAGES_PER_LOAD);
  const [modalImg, setModalImg] = useState(null);
  const closeBtnRef = useRef();
  const [entered, setEntered] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Load images
  useEffect(() => {
    setVisibleImages(allImages.slice(0, loadedCount));
    setIsLoading(false);
  }, [loadedCount]);

  // Infinite scroll with loader
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        loadedCount < allImages.length &&
        !isLoading
      ) {
        setIsLoading(true);
        setTimeout(() => {
          setLoadedCount((prev) => prev + IMAGES_PER_LOAD);
        }, 900); // Simulate loading
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadedCount, isLoading]);

  // Modal: ESC & arrow navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!modalImg) return;
      if (e.key === "Escape") setModalImg(null);
      if (e.key === "ArrowLeft") {
        const idx = visibleImages.findIndex((img) => img.id === modalImg.id);
        if (idx > 0) setModalImg(visibleImages[idx - 1]);
      }
      if (e.key === "ArrowRight") {
        const idx = visibleImages.findIndex((img) => img.id === modalImg.id);
        if (idx < visibleImages.length - 1) setModalImg(visibleImages[idx + 1]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalImg, visibleImages]);

  // GSAP hover floating effect for gallery images
  useEffect(() => {
    const cards = document.querySelectorAll(".gallery-float");
    cards.forEach((card) => {
      let tl;
      const onEnter = () => {
        tl = gsap.to(card, {
          y: -8,
          scale: 1.025,
          boxShadow: "0 8px 32px 0 rgba(255,255,255,0.10)",
          duration: 0.35,
          ease: "power2.out",
        });
      };
      const onLeave = () => {
        if (tl) tl.kill();
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 2px 8px 0 #0002",
          duration: 0.5,
          ease: "elastic.out(1,0.5)",
        });
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    });
  }, [visibleImages]);

  // GSAP close button pop-in
  useEffect(() => {
    if (modalImg && closeBtnRef.current) {
      gsap.fromTo(
        closeBtnRef.current,
        { scale: 0, rotate: -90 },
        { scale: 1, rotate: 0, duration: 0.7, ease: "elastic.out(1,0.5)" }
      );
    }
  }, [modalImg]);

  // Animation variants
  const imageVariants = {
    initial: { opacity: 0, scale: 0.96, y: 32 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
    exit: { opacity: 0, scale: 0.96, y: 32, transition: { duration: 0.3 } },
  };

  // Download handler
  const handleDownload = (img) => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = img.name || "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full px-2 py-8">
      {/* Loader for infinite scroll */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/70"
          >
            <div className="text-5xl font-extrabold text-cyan-400 mb-8 animate-pulse">Loading...</div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-cyan-400"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Masonry columns */}
      <div
        className="
          columns-1
          sm:columns-2
          md:columns-3
          lg:columns-4
          gap-4
          [column-fill:_balance]
        "
      >
        <AnimatePresence>
          {visibleImages.map((img, idx) => (
            <motion.div
              key={img.id}
              layoutId={img.id}
              className="mb-4 break-inside-avoid overflow-visible rounded-xl group relative cursor-pointer gallery-float"
              initial={entered[img.id] ? false : "initial"}
              animate="animate"
              exit="exit"
              variants={imageVariants}
              transition={{
                duration: 0.6,
                delay: entered[img.id] ? 0 : idx * 0.06,
                type: "spring",
                stiffness: 90,
                damping: 18,
              }}
              onAnimationComplete={() => {
                if (!entered[img.id])
                  setEntered((prev) => ({ ...prev, [img.id]: true }));
              }}
              onClick={() => setModalImg(img)}
              whileTap={{ scale: 0.97 }}
            >
              {/* Gradient border on hover */}
              <motion.div
                className="absolute inset-0 z-10 rounded-xl pointer-events-none"
                initial={false}
                animate={{ 
                  opacity: 0, 
                  boxShadow: "0 0 0px 0px #00ffd0" 
                }}
                whileHover={{
                  opacity: 1,
                  boxShadow: "0 0 24px 4px #00ffd0, 0 0 48px 8px #00bfff55",
                  transition: { duration: 0.35 }
                }}
                transition={{ duration: 0.35 }}
              />
              <motion.img
                src={img.src}
                alt=""
                loading="lazy"
                className="w-full h-auto rounded-xl object-cover object-center transition-transform duration-500 group-hover:scale-105"
                style={{ boxShadow: "0 2px 8px 0 #0002" }}
                whileHover={{
                  scale: 1.08,
                  rotate: -2,
                  filter: "brightness(0.95) saturate(1.2)",
                  boxShadow: "0 8px 32px 0 #00ffd055",
                  transition: { type: "spring", stiffness: 200, damping: 18 }
                }}
              />
              {/* Info overlay slides up on hover */}
              {/* Subtle overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
            style={{ backdropFilter: "blur(8px)" }}
            onClick={() => setModalImg(null)}
          >
            <motion.div
              layoutId={modalImg.id}
              initial={{ scale: 0.8, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative max-w-4xl w-[90vw] max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                ref={closeBtnRef}
                onClick={() => setModalImg(null)}
                className="absolute top-2 right-2 text-white text-4xl font-bold bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition z-10"
                aria-label="Close"
              >
                &times;
              </button>
              {/* Download button */}
              <button
                onClick={() => handleDownload(modalImg)}
                className="absolute top-2 left-2 text-white text-2xl bg-cyan-600 rounded-full w-12 h-12 flex items-center justify-center hover:bg-cyan-800 transition z-10"
                aria-label="Download"
                title="Download"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4m-9 8h14" />
                </svg>
              </button>
              <motion.img
                src={modalImg.src}
                alt=""
                initial={{ scale: 0.95, opacity: 0, rotate: -3 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.95, opacity: 0, rotate: 3 }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
                className="rounded-xl shadow-2xl max-h-[70vh] w-auto object-contain bg-black"
                style={{ background: "black" }}
              />
              {/* Prev/Next arrows */}
              <button
                onClick={() => {
                  const idx = visibleImages.findIndex((img) => img.id === modalImg.id);
                  if (idx > 0) setModalImg(visibleImages[idx - 1]);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition z-10"
                aria-label="Previous"
                disabled={visibleImages.findIndex((img) => img.id === modalImg.id) === 0}
                style={{ opacity: visibleImages.findIndex((img) => img.id === modalImg.id) === 0 ? 0.3 : 1 }}
              >
                &#8592;
              </button>
              <button
                onClick={() => {
                  const idx = visibleImages.findIndex((img) => img.id === modalImg.id);
                  if (idx < visibleImages.length - 1) setModalImg(visibleImages[idx + 1]);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition z-10"
                aria-label="Next"
                disabled={visibleImages.findIndex((img) => img.id === modalImg.id) === visibleImages.length - 1}
                style={{ opacity: visibleImages.findIndex((img) => img.id === modalImg.id) === visibleImages.length - 1 ? 0.3 : 1 }}
              >
                &#8594;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MasonryGridGallery;