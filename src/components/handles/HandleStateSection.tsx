"use client";
import { material } from "@/lib/material";
import Lottie from "lottie-react";
import error from "../../../public/lotties/error.json";
import empty from "../../../public/lotties/empty.json";
import loader from "../../../public/lotties/loader.json";

interface HandleStatusSectionProps {
  type: "error" | "empty" | "loading";
}
export default function HandleStatusSection({
  type,
}: HandleStatusSectionProps) {
  return (
    <material.Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "cetner",
      }}
    >
      <Lottie
        animationData={
          type === "loading" ? loader : type === "empty" ? empty : error
        }
        autoplay
        loop
        style={{ alignItems: "center", width: 200, height: 200 }}
      />
      {type !== "loading" && (
        <material.Typography variant="body2" sx={{ textAlign: "center" }}>
          {type === "error"
            ? "Error occurred, Please retry again"
            : "No data found, Please try again later"}
        </material.Typography>
      )}
    </material.Box>
  );
}
