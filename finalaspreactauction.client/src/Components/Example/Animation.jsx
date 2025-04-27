"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AddCar1 from "../Fetch/AddCar1";

export default function ExitAnimation() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div style={container}>
            <AnimatePresence initial={false}>
                {!isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        style={motionBox}
                    >
                        <AddCar1 />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                style={button}
                onClick={() => setIsVisible(!isVisible)}
                whileTap={{ y: 1 }}
            >
                {!isVisible ? "Hide Form" : "Show Form"}
            </motion.button>
        </div>
    );
}

const container = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    margin:"10px"
};

const motionBox = {
    width: "100%",
    maxWidth: "500px", 
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
};

const button = {
    backgroundColor: "#0cdcf7",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "#0f1115",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom:"10px"
};
