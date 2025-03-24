export default function Chat({ contact, message, dispatch }) {
    return (
        <section>
            <textarea value={message} onChange={(e) => {
                dispatch({
                    type: 'edited_message',
                    message: e.target.value
                })
            }}>
            </textarea>
            <br />
            <button
                onClick={() => {
                    alert(`正在发送 "${message}" 到 ${contact.email}`);
                    dispatch({
                        type: 'sent_message',
                    });
                }}>
                发送到 {contact.email}
            </button>
        </section>
    )
}