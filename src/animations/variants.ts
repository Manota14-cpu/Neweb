import { Variants, Transition } from 'framer-motion'

export const easePremium = [0.16, 1, 0.3, 1] as const
export const easeOutExpo = easePremium
export const easeOutQuint = [0.22, 1, 0.36, 1] as const
export const easeOutBack = [0.34, 1.56, 0.64, 1] as const
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const

export const springGentle: Transition = {
  type: 'spring', stiffness: 120, damping: 14, mass: 0.8,
}
export const springSnappy: Transition = {
  type: 'spring', stiffness: 200, damping: 20,
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: easePremium } },
}
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: easePremium } },
}
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: easePremium } },
}
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1, ease: easePremium } },
}
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1, ease: easePremium } },
}
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: easePremium } },
}
export const scaleOut: Variants = {
  hidden: { opacity: 0, scale: 1.1, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease: easePremium } },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -6, transition: { duration: 0.5, ease: easePremium } },
}

export const glowPulse: Variants = {
  initial: { opacity: 0.3, scale: 1 },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.05, 1],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: easePremium } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: easePremium } },
}

export const revealFromLeft: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.5, ease: easeInOutQuint },
  },
}

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -60 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.025, duration: 0.5, ease: easeOutBack },
  }),
}
