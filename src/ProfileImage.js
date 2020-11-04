import profileImage from "./profile.jpeg";

function ProfileImage() {
  return (
    <div className="py-10">
      <img
        className="object-contain mx-auto h-40 rounded-full shadow-2xl"
        src={profileImage}
        alt="me"
      />
      <div className="mx-auto w-40 text-center font-bold my-2 text-2xl capitalize">
        Yash Ladha
      </div>
    </div>
  );
}

export default ProfileImage;
