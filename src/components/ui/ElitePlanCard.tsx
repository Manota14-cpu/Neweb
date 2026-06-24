import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ElitePlanCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  onAction?: () => void;
  className?: string;
}

function useImageLoaded(src: string) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
  }, [src]);
  return loaded;
}

export const ElitePlanCard = React.forwardRef<
  HTMLDivElement,
  ElitePlanCardProps
>(
  (
    {
      className,
      imageUrl,
      title,
      subtitle,
      description,
      highlights = [],
      onAction,
    },
    ref
  ) => {
    const { t } = useLanguage();
    const imageLoaded = useImageLoaded(imageUrl);
    const handleKeyDown = onAction
      ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAction(); } }
      : undefined;

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-3xl hover:shadow-xl bg-black cursor-pointer",
          className
        )}
        onClick={onAction}
        onKeyDown={handleKeyDown}
        tabIndex={onAction ? 0 : undefined}
        role={onAction ? "button" : undefined}
        aria-label={onAction ? `View ${title} on NASA Images` : undefined}
      >
        <motion.div
          className="relative h-64 w-full overflow-hidden bg-white/5"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.45 }}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-white/10" />
          )}
          <img
            src={imageUrl}
            alt={`${title} — ${subtitle} — NASA`}
            loading="lazy"
            className={`h-full w-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black via-black/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 p-6 bg-black text-white">
          <p className="text-sm uppercase tracking-wider text-white">
            {subtitle}
          </p>
          <h3 className="mt-1 text-2xl font-bold">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white">
            {description}
          </p>

          {highlights.length > 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-white">
              {highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 rounded-md bg-white/10 px-2 py-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {onAction && (
            <div className="mt-6" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onAction}
                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-gray-200 cursor-pointer"
              >
                {t('elitePlanCard.learnMore')}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

ElitePlanCard.displayName = "ElitePlanCard";
