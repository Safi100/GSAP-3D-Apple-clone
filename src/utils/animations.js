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