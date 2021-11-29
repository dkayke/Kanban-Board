import { FC, useState } from 'react';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { Card } from 'assets/types';
import "./style.less";

interface CardInsertPorps {
    data?: {
        title: string;
        content: string;
    };
    isEdit?: boolean;
    onInsert?: (card: Partial<Card>) => void;
    onCancel?: () => void;
}

const CardInsert: FC<CardInsertPorps> = ({ onInsert, onCancel, data = {}, isEdit = false }) => {

    const [_isEdit, setIsEdit] = useState<boolean>(isEdit);
    const [title, setTitle] = useState<string>(data.title || '');
    const [content, setContent] = useState<string>(data.content || '');

    const limpar = () => {
        setTitle('');
        setContent('');
    };

    const cancel = () => {
        if (isEdit) {
            onCancel && onCancel();
            return;
        }

        limpar();
        setIsEdit(false);
    };

    const insert = () => {
        onInsert && onInsert({ titulo: title, conteudo: content });

        if (!isEdit) {
            limpar();
            setIsEdit(false);
        }

    };

    if (_isEdit) {
        return (
            <>
                <div className="card-insert">

                    <div className="line-top">
                        <div className="line-color"></div>
                    </div>

                    <div className="card-content">
                        <input type="text" defaultValue={title} onChange={(event) => setTitle(event.target.value.trim())} placeholder="Titulo do card" />
                        <div className="line-gap"></div>
                        <textarea className="textarea" onChange={(event) => setContent(event.target.value.trim())} placeholder="# Conteúdo *markdown*.">{content}</textarea>
                    </div>

                    <div className="card-buttons">
                        <div className="group-buttons">
                            <button onClick={cancel} className="cancel-button">
                                <p>Cancelar</p>
                            </button>

                            {isEdit && (
                                <button onClick={insert} disabled={(title.trim() === "" || content.trim() === "") || (title.trim() === data.title?.trim() && content.trim() === data.content?.trim())}>
                                    <p>Atualizar</p>
                                </button>
                            )}

                            {!isEdit && (
                                <button onClick={insert} disabled={title === "" || content === ""}>
                                    <p>Criar</p>
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <button className="new-card" onClick={(event) => {
                event.preventDefault();
                setIsEdit(true)
            }}><BsFillPlusSquareFill className="plus" /> &nbsp; Novo card</button>
        </>
    );
}

export default CardInsert;
