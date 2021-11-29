import { FC, useState } from 'react';
import { BsPencilSquare, BsXSquare, BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { Card as CardType, ListName } from 'assets/types';
import ReactMarkdown from 'react-markdown';
import CardInsert from 'components/CardInsert';
import "./style.less";

interface CardPorps {
    data: CardType;
    onDelete?: (card: CardType) => void;
    onEdit?: (card: CardType) => void;
    onPrevious?: (card: CardType) => void;
    onNext?: (card: CardType) => void;
}

const Card: FC<CardPorps> = ({ onDelete, onEdit, onPrevious, onNext, data }) => {

    const [editing, setEditing] = useState(false);

    const edit = () => {
        setEditing(true);
        onEdit && onEdit(data);
    };

    const _delete = () => {
        const confirmacao = window.confirm("Ao clicar em OK você deletará este card, caso não queira fazer isso, cancele.");
        if (confirmacao) {
            onDelete && onDelete(data);
        }
    };

    const next = () => {
        onNext && onNext(data);
    };

    const previous = () => {
        onPrevious && onPrevious(data);
    };

    if (editing) {
        return <CardInsert isEdit data={{ title: data.titulo, content: data.conteudo }}
            onCancel={() => {
                setEditing(false)
            }}
            onInsert={(card: Partial<CardType>) => {
                onEdit && onEdit(Object.assign(data, card));
                setEditing(false)
            }}
        />
    }

    return (
        <>
            <div className="card">

                <div className="line-top">
                    <div className="line-color"></div>
                </div>

                <div className="card-content">
                    <h1 className="title">{data.titulo}</h1>
                    <div className="line-gap"></div>
                    <ReactMarkdown className="markdown">{data.conteudo}</ReactMarkdown>
                </div>

                <div className="card-buttons">
                    <div className="line-gap"></div>

                    <div className="group-buttons">
                        <div className="button-edit">
                            <button onClick={_delete}>
                                <BsXSquare size={20} className="icon-edit" />
                            </button>
                            <button onClick={edit}>
                                <BsPencilSquare size={20} className="icon-edit" />
                            </button>
                        </div>

                        <div className="button-move">
                            <button onClick={previous} disabled={data.lista === ListName.TODO}>
                                <BsChevronCompactLeft size={20} className="icon-move" />
                            </button>
                            <button onClick={next} disabled={data.lista === ListName.DONE}>
                                <BsChevronCompactRight size={20} className="icon-move" />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Card;
