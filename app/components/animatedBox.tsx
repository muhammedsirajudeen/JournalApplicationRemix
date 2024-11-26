import { useState, useEffect } from "react";
import { motion } from "motion/react";

const ResponsiveMotionDiv = () => {
    // State for responsive width
    const [windowWidth, setWindowWidth] = useState(0);

    // useEffect hook to ensure we only access `window` on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth); // Set window width on the client-side
            const handleResize = () => {
                setWindowWidth(window.innerWidth); // Update width on resize
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []); // Empty dependency array ensures this only runs once after the component mounts

    // Set different animate values based on the screen width
    let widthValue = 0;
    let heightValue=0
    if (windowWidth < 1000) {
        widthValue = 200; // Small screen
        heightValue=90
    } else if (windowWidth < 1024) {
        widthValue = 400; // Medium screen
        heightValue=200
    } else {
        widthValue = 800; // Large screen
        heightValue=300
    }

    return (
        <motion.div
            className="bg-black  w-1 flex items-center flex-col justify-center"
            initial={{ height: 0, y: 96 }} // Start from bottom, with height 0
            animate={{
                height: heightValue,
                y: 0,
                width: widthValue, // Responsive width
            }}
            transition={{
                duration: 0.5,
                delay: 0.5,
                width: { delay: 1 }, // Delay for width change
            }}
        >
            <motion.h1
                className="poppins-regular text-white lg:text-largest sm:text-4xl text-nowrap"
                initial={{ x: "-100%" }} // Start off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                transition={{ type: "spring", stiffness: 100, damping: 25, delay:1 }} // Smooth spring animation
            >
                WRITE.
            </motion.h1>
            {/* <motion.button className="bg-white text-xs text-black poppins-regular mt-10 p-2" >
                Register
            </motion.button> */}
        </motion.div>
    );
};

export default ResponsiveMotionDiv;
