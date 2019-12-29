import firebase from './firebase';
import { consoleError } from '../utils';
const db = firebase.firestore();

export function registListener(onAdded, onModified, onDeleted, user) {
    return db.collection('todos').where('uid', '==', user.uid)
        .onSnapshot(function (querySnapshot) {
            for (let change of querySnapshot.docChanges()) {
                let todo = Object.assign({ id: change.doc.id }, change.doc.data());
                if (change.type === 'added') {
                    onAdded(todo);
                }
                else if (change.type === 'modified') {
                    onModified(todo);
                }
                else if (change.type === 'removed') {
                    onDeleted(todo)
                }
            }
        })
}
export function addTodo(
    todoName,
    user,
    onFailed = consoleError
) {
    db.collection('todos').add({
        uid: user.uid,
        name: todoName,
    })
        .catch(onFailed);
}
export function modifyTodo(
    todo,
    onFailed = consoleError
) {
    const { id, ...data } = todo;
    db.collection('todos').doc(id).set({
        ...data,
        lastUpdate: Date.now()
    }, { merge: true })
        .catch(onFailed);
}
export function deleteTodo(
    todo,
    onFailed = consoleError
) {
    db.collection('todos')
        .doc(todo.id)
        .delete()
        .catch(onFailed);
}

export function updateTodos(
    todos,
    onFailed = consoleError
) {
    let batch = db.batch();
    for (const todo of todos) {
        const ref = db.collection('todos').doc(todo.id);
        batch.update(ref, todo);
    }
    batch.commit().catch(onFailed);
}