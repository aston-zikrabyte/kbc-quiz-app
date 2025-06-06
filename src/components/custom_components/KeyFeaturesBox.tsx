import Image from "next/image";
import React from "react";

interface KeyFeaturesBoxProps {
  imgPath: string;
  mainContent: string;
  secondaryContent: string;
}

const KeyFeaturesBox = ({
  imgPath,
  mainContent,
  secondaryContent,
}: KeyFeaturesBoxProps) => {
  return (
    <div className="bg-background/5 border-background/4 rounded-sm border-1 p-5">
      <Image
        src={`/icons/${imgPath}`}
        alt={imgPath}
        width={60}
        height={60}
        className="rounded-md bg-gradient-to-b from-violet-600 via-purple-600 to-gray-900 p-4"
      />
      <p className="mt-4 text-2xl font-bold">{mainContent}</p>
      <p className="mt-4 text-gray-400">{secondaryContent}</p>
    </div>
  );
};

export default KeyFeaturesBox;
