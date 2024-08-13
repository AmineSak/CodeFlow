const EmailTemplate = ({ name, message, email }) => {
  return (
    <div>
      <h1>
        {" "}
        Message from {name} , his email: {email}
      </h1>
      <p>{message}</p>
    </div>
  );
};

export default EmailTemplate;
