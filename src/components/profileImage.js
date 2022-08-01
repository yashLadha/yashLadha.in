import React from "react";
import { StaticImage } from "gatsby-plugin-image";

function ProfileImage() {
  return (
    <div className="py-10">
      <div className="md:p-4 relative z-0">
        <StaticImage
          className="object-contain mx-auto h-40 rounded-full z-10 shadow-2xl shadow-blue-500/60"
          layout="fixed"
          src="../images/profile.jpeg"
          placeholder="blurred"
          width={160}
          height={160}
          alt="me"
        />
      </div>
    </div>
  );
}

export default ProfileImage;
