import Image from "next/image";

const loading = () => {
  return (
    <div>
      <Image
        src="/assets/icons/loader.svg"
        width={250}
        height={250}
        alt="loading..."
        className="py-[150px]"
      />
      <h1 className="font-sourceCodePro text-xl text-white text-center">
        {" "}
        loading...
      </h1>
    </div>
  );
};

export default loading;
