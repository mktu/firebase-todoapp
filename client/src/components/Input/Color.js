export default (theme) => {
    return {
        primary: {
            labelColor: theme.textS,
            inputColor: theme.textP,
            focusLabelColor: theme.p,
            inputFocusColor: theme.textP,
            barColor: theme.p,
            textColor: theme.textP,
            dividerColor: theme.divider
        },
        secondary: {
            labelColor: theme.textS,
            inputColor: theme.textP,
            focusLabelColor: theme.s,
            inputFocusColor: theme.textP,
            barColor: theme.s,
            textColor: theme.textS,
            dividerColor: theme.divider
        }
    };
}