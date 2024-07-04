import gsap from "gsap";
import ScrollTrigger from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export const animate_with_Gsap = (target, animationProbs, scrollProps) => {
    gsap.to(target, {
        ...animationProbs,
        scrollTrigger: {
            trigger: target,
            toggleActions: 'restart reverse restart reverse',
            start: "top 85%",
            ...scrollProps
        },
    })
}

export const animation_Gsap_timeline = (timeLine, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
    timeLine.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: "power2.inOut",
    });
    timeLine.to(firstTarget, {
        ...animationProps,
        ease: "power2.inOut",
    },
    '<'
    );
    timeLine.to(secondTarget, {
        ...animationProps,
        ease: "power2.inOut",
    },
    '<'
    );
}