import firebase from './firebase';

const db = firebase.firestore();

export async function registListener(dispatch, user) {
    const dispatchTodo = (type, todo) => {
        dispatch({
            type, payload: {
                todo
            }
        });
    }
    return db.collection('todos').where('uid', '==', user.uid)
        .onSnapshot(function (querySnapshot) {
            for (let change of querySnapshot.docChanges()) {
                let todo = Object.assign({ id: change.doc.id }, change.doc.data());
                if (change.type === 'added') {
                    dispatchTodo('added', todo);
                }
                else if (change.type === 'modified') {
                    dispatchTodo('modified', todo);
                }
                else if (change.type === 'removed') {
                    dispatchTodo('removed', todo)
                }
            }
        })
}

export function addTodo(todoName, user) {
    db.collection('todos').add({
        uid: user.uid,
        name: todoName,
    })
        .catch(function (error) {
            console.error(error)
        });
}