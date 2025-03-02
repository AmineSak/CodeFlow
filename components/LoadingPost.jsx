import Image from "next/image";

const LoadingPost = () => {
  return (
    <div className="glassmorphism flex-center p-5 w-[640px] mt-8 max-w-full">
      <Image
        src="/assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loading..."
      />
    </div>
  );
};

export default LoadingPost;
