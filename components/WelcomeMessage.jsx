const WelcomeMessage = ({ name }) => {
  return (
    <div className="text-center mt-8">
      <h1 className="head_text">
        {" "}
        Welcome <span className="red_gradient">{name}</span> To The{" "}
        <span className="font-sourceCodePro"> CodeFlow</span> Community
      </h1>
      <p className="text-3xl font-montserrat text-gray-200 text-center mt-5">
        {" "}
        Start <span className=" font-bold orange_gradient">
          Posting{" "}
        </span> &{" "}
        <span className=" font-bold orange_gradient">Interacting </span> with
        other’s posts
      </p>
    </div>
  );
};

export default WelcomeMessage;
