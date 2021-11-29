import { FC } from 'react';
import "./style.less";

interface CardListProps {
    color: "RED" | "GREEN" | "BLUE" | "YELLOW",
}

const CardList: FC<CardListProps> = ({color, children}) => {
    return (
        <>
            <div className={`card-list ${color}`}>
               {children} 
            </div>
        </>
    )
}

export default CardList;
