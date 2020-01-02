export const consoleError = (error) => { console.error(error) };
export const consoleLogger = (info) => { console.log(info); };

export const spliceAndInsert = (src = [], inserted, removed) => {
    let dest = [...src];
    dest.splice(removed, 1);
    dest.splice(inserted, 0, src[removed]);
    return dest;
};

export const sortByDate = (todos) => {
    const listWithDueDate = todos.filter(todo => Boolean(todo.dueDate));
    const listWithoutDueDate = todos.filter(todo => !Boolean(todo.dueDate));
    const sorted = listWithDueDate.sort((i1, i2) => {
        const i1date = new Date(i1.dueDate);
        const i2Date = new Date(i2.dueDate);
        return i1date - i2Date;
    });
    return [...sorted, ...listWithoutDueDate];
}