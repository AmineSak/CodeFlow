const NewPostMailTemplate = ({ post }) => {
  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {post.creator?.image && (
            <img
              src={post.creator.image}
              alt="profile"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ margin: 0, fontSize: "14px" }}>
              {post.creator?.username}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#808080" }}>
              {post.createdAt}
            </p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px", fontSize: "16px" }}>{post.text}</div>
      {post.code && (
        <pre
          style={{
            marginTop: "20px",
            backgroundColor: "#2d2d2d",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          <code>{post.code}</code>
        </pre>
      )}
    </div>
  );
};

export default NewPostMailTemplate;
