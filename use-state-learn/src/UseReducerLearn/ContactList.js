export default function ContactList({ contacts, selectedId, dispatch }) {
    return (
        <section>
            <ul>
                {contacts.map((contact) => {
                    return (
                        <div>
                            <li key={contact.id}>
                                <button onClick={() => {
                                    dispatch({
                                        type: 'changed_selection',
                                        id: contact.id
                                    })
                                }}>{selectedId === contact.id ? <b>{contact.name}</b> : contact.name}</button>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </section>
    )
}