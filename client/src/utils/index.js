export const consoleError = (error) => { console.error(error) };
export const consoleLogger = (info) => { console.log(info); };

export const spliceAndInsert = (src=[],inserted,removed) => {
    let dest = [...src];
    dest.splice(removed,1);
    dest.splice(inserted,0,src[removed]);
    return dest;
};
