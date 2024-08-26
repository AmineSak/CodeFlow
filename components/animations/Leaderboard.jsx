"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/assets/lottie/Leaderboard.json";

export default function Leaderboard() {
  return (
    <div className="flex flex-col w-full mt-8 justify-center items-center">
      <Lottie
        animationData={animationData}
        className="flex justify-center items-center"
        loop={true}
        style={{ height: "20%", width: "20%" }}
      />
      <h1 className="font-sourceCodePro text-lg text-white text-center">
        Leaderboard Coming Soon...
      </h1>
    </div>
  );
}
