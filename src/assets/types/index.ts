export type Card = {
    id: string,
    titulo : string, 
    conteudo: string, 
    lista: string
}

export enum ListName {
    TODO = "to-do",
    INPROGRESS = "in-progress",
    DONE = "done"
}