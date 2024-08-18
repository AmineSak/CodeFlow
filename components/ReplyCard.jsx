import Image from "next/image";

const ReplyCard = ({ reply }) => {
  const avatarSrc = reply.creator?.image || "/assets/icons/avatar.svg";

  return (
    <div className="flex-start flex-col  w-full max-w-full gap-1">
      <div className="flex-start w-full ">
        <Image
          src={avatarSrc}
          alt="profile"
          width={30}
          height={30}
          className="rounded-full mt-1"
        />

        <p className="font-inter text-sm text-white p-2">
          {reply.creator?.username || reply.creator?.name}
        </p>
      </div>
      <div className="text-white text-sm p-2 bg-[#80808080] w-full rounded-md">
        {reply.text}
      </div>
    </div>
  );
};

export default ReplyCard;
