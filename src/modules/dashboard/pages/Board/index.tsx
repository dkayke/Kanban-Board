import { FC, useEffect, useState } from 'react';
import { Card, CardList, ColumnTitle, CardInsert } from "components"
// import { EventInsert } from 'components/CardInsert';
import { DeleteCardService, GetCardsService, SaveCardService, UpdateCardService } from 'services/cards';
import { Card as CardType, ListName } from 'assets/types';
import "./style.less";

const Board: FC = () => {

    const [cards, setCards] = useState<CardType[]>([]);
    const [cardsToDo, setCardsToDo] = useState<CardType[]>([]);
    const [cardsInProgress, setCardsInProgress] = useState<CardType[]>([]);
    const [cardsDone, setCardsDone] = useState<CardType[]>([]);

    const getCardsService = new GetCardsService().useAsHook();
    const saveCardService = new SaveCardService().useAsHook();
    const updateCardService = new UpdateCardService().useAsHook();
    const deleteCardService = new DeleteCardService().useAsHook();

    useEffect(() => {
        getCardsService.send({});
    }, []); // eslint-disable-line

    useEffect(() => {
        setCardsToDo(cards.filter(c => c.lista === ListName.TODO));
        setCardsInProgress(cards.filter(c => c.lista === ListName.INPROGRESS));
        setCardsDone(cards.filter(c => c.lista === ListName.DONE));
    }, [cards]);

    const onInsert = (event: Partial<CardType>) => {
        saveCardService.send({
            titulo: event.titulo as string,
            conteudo: event.conteudo as string,
            lista: ListName.TODO
        });
    };

    const onDelete = (card: CardType) => {
        deleteCardService.send(card);
    }
    
    const onEdit = (card: CardType) => {
        updateCardService.send(card);
    }

    const onNext = (card: CardType) => {
        switch (card.lista) {
            case ListName.TODO: card.lista = ListName.INPROGRESS;
                break;
            case ListName.INPROGRESS: card.lista = ListName.DONE;
                break;
            default: break;
        }

        updateCardService.send(card);
    };

    const onPrevious = (card: CardType) => {
        switch (card.lista) {
            case ListName.DONE: card.lista = ListName.INPROGRESS;
                break;
            case ListName.INPROGRESS: card.lista = ListName.TODO;
                break;
            default: break;
        }

        updateCardService.send(card);
    };

    getCardsService.onSuccess(() => {
        setCards(getCardsService.response || []);
    });

    saveCardService.onSuccess(() => {
        if (saveCardService.response) {
            setCards(cards.concat(saveCardService.response));
        }
    });

    updateCardService.onSuccess(() => {
        const cardUpdated = updateCardService.response || {} as CardType;
        delete cards[cards.findIndex(card => card.id === cardUpdated.id)];
        const newCards = cards.filter(cards => cards).slice();
        newCards.push(cardUpdated);
        setCards(newCards);
    });

    deleteCardService.onSuccess(() => {
        if (deleteCardService.response) {
            setCards(deleteCardService.response);
        }
    });

    return (
        <>
            <div className="board">
                <CardList color="RED">
                    <ColumnTitle title="To Do" count={cardsToDo.length} />
                    <CardInsert onInsert={onInsert} />
                    {cardsToDo.map((card) => {
                        return <Card
                            data={card}
                            onNext={onNext}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />;
                    })}
                </CardList>

                <CardList color="BLUE">
                    <ColumnTitle title="In Progress" count={cardsInProgress.length} />
                    {cardsInProgress.filter(c => c.lista === ListName.INPROGRESS).map((card) => {
                        return <Card
                            data={card}
                            onNext={onNext}
                            onPrevious={onPrevious}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />;
                    })}
                </CardList>

                <CardList color="GREEN">
                    <ColumnTitle title="Done" count={cardsDone.length} />
                    {cardsDone.map((card) => {
                        return <Card
                            data={card}
                            onPrevious={onPrevious}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />;
                    })}
                </CardList>
                
            </div>
        </>
    );
}

export default Board;

