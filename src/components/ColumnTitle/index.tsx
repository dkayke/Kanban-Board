import { FC } from 'react';
import "./style.less";

interface ColumnTitleProps {
    title: string,
    count?: number
}

const ColumnTitle: FC<ColumnTitleProps> = ({ title, count }) => {
    const hasCount = count !== undefined;

    return (
        <div className="card-title">
            <div className={`title ${!hasCount && 'title-without-count'}`}><h1>{title}</h1></div>
            {hasCount && <div className="count"><p>{count}</p></div>}
        </div>
    );
}

export default ColumnTitle;
