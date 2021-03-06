import React, { useState } from 'react';
import DayRangePicker from '../dayPicker/DayRangePicker';
import { Modal } from '../modal/Modal';
import { TRange } from '../tourWrite/helper';

export interface IDayPickerModal {
    onSubmit: (range: TRange) => void;
    defaultRange: TRange;
}

export const DayPickerModal: React.FC<IDayPickerModal> = ({ onSubmit, defaultRange }) => {
    const [{ from, to }, setRange] = useState<TRange>(defaultRange);

    const handleSubmit = () => {
        onSubmit({ from, to });
    }
    return <Modal style={{
        display: "none"
    }} id="dayPickerModal" title="날짜선택">
        <DayRangePicker from={from} to={to} onRangeChange={setRange} />
        <button onClick={handleSubmit} className="btn w100">변경하기</button>
    </Modal>;

};
