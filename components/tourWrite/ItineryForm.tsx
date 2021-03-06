import React, { useRef } from 'react';
// import { Iitineraries } from "../TourWrite";
import dayjs from "dayjs";
import { ItineraryCreateInput } from '../../types/api';
import { ISet } from 'types/interface';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import("components/edit/CKE2"), { ssr: false });
interface IProp {
    its: ItineraryCreateInput[];
    itinery: ItineraryCreateInput;
    setits: ISet<any[]>
    index: number;
}

export const ItineryForm: React.FC<IProp> = ({ itinery, its, setits, index }) => {

    const handleAddContent = () => {
        itinery.contents = [...(itinery.contents || []), ""]
        setits([...its])
    }

    const handleDeleteImg = (index: number) => () => {
        itinery.images?.splice(index, 1);
        setits([...its])
    }

    const handleDeleteContent = (index: number) => () => {
        itinery.contents?.splice(index, 1);
        setits([...its]);
    }

    const handleOnChange = (i: number) => (value: string) => {
        if (typeof itinery.contents[index] === undefined) return;
        itinery.contents[i] = value;
        setits([...its])
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        itinery.title = e.currentTarget.value;
        setits([...its])
    }

    const lastOrSingle = (index: number) => {
        if (!itinery.contents) return;
        return index === (itinery.contents.length - 1) || itinery.contents.length === 1;
    }

    return <div className="day_tap">
        <div className="texta_title">
            <input type="text" className="input_01" onChange={handleTitle} value={itinery.title} placeholder={`${index}일차`} />
            <input readOnly type="text" className="input_02" value={dayjs(itinery.date).format("YYYY.MM.DD (ddd)")} />
        </div>
        {itinery.contents?.map((content, contentIndex) =>
            <div key={`${contentIndex}${index}content`}>
                <Editor onChange={handleOnChange(contentIndex)} key={"initeryFrom__content" + contentIndex} data={content} />
                <button onClick={handleDeleteContent(contentIndex)} className="comment_btn mini elimination">
                    일정삭제
                </button>
                {lastOrSingle(contentIndex) && <button onClick={handleAddContent} className="comment_btn mini add">일정추가</button>}
            </div>
        )}
        <div>
            {itinery?.images?.map((img, i) =>
                <div key={i + "img" + index} className="initrary__img">
                    <img style={{
                        height: "100px"
                    }} src={img.uri} />
                    <i onClick={handleDeleteImg(i)} className="flaticon-multiply icon_x"></i>
                </div>
            )}
        </div>
    </div>;
};

