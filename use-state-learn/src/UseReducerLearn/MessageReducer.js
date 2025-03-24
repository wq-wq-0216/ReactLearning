
export const initialState = {
    selectedId: 0,
    messages: {
        0: 'Message 1',
        1: 'Message 2',
        2: 'Message 3',
    }
}

export default function MessageReducer(state, action) {
    switch (action.type) {
        case 'changed_selection': {
            return {
                ...state,
                selectedId: action.id
            }
        }
        case 'edited_message': {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [state.selectedId]: action.message
                }
            }
        }
        case 'sent_message': {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [state.selectedId]: ''
                }
            }
        }
        default: {
            throw new Error('Unhandled action type: ${action.type}')
        }
    }
}