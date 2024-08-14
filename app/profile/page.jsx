import Nav from "@/components/Nav";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="w-full max-w-full">
      <Nav />
      <div className="flex-center flex-col">
        <Image
          src="/assets/icons/loader.svg"
          width={250}
          height={250}
          alt="loading..."
          className="pt-[100px] "
        />
        <h1 className="font-sourceCodePro text-xl text-white text-center">
          {" "}
          Coming Soon...
        </h1>
      </div>
    </div>
  );
};

export default ProfilePage;
