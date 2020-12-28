import React, { useContext } from 'react';
import { EditContext } from '../../pages/_app';

interface IProp {
    path: string
}

export const HiddenSubmitBtn: React.FC<IProp> = ({ path }) => {
    const { submitEdit, setPage, page } = useContext(EditContext);

    const submit = () => {
        console.log("submitEdit");
        console.log(submitEdit);
        if (submitEdit)
            submitEdit(path, page)
    }

    const reset = () => {
        setPage(page);
    }

    const hiddenStyle: React.CSSProperties = {
        opacity: 0,
        position: "absolute",
        width: "1px",
        height: "1px"
    }

    return <div style={hiddenStyle}>
        <div onClick={submit} id="PageSubmitBtn" hidden />
        <div onClick={reset} id="PageRestBtn" hidden />
    </div>;
};
