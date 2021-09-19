import "../index.css";
const Message = ({ message, type }) => {
    if (message) {
        return <div className={type === "success" ? "successMessage" : "errorMessage"}>{message}</div>;
    }
    return null;
};

export default Message;
