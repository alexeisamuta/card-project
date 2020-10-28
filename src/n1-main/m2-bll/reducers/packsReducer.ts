import {Dispatch} from 'redux';
import {packsAPI} from '../../m3-dal/api';

const InitialState: InitialStateType = {
    cardPacks: [{
        _id: null,
        user_id: null,
        user_name: null,
        private: null,
        name: null,
        path: null,
        grade: null,
        shots: null,
        cardsCount: null,
        type: null,
        rating: null,
        created: null,
        updated: null,
        more_id: null,
        __v: null,
        deckCover: null
    },
    ],
    page: null,
    pageCount: null,
    cardPacksTotalCount: null,
    minCardsCount: null,
    maxCardsCount: null,
    token: null,
    tokenDeathTime: null,
}


export const packsReducer = (state = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS':
            return {...state, ...action.packs}
        case "ADD_PACK":
            return {...state, cardPacks: [action.pack, ...state.cardPacks]}
        case "DELETE_PACK":

            return {...state,
                cardPacks: state.cardPacks.filter(card => card._id !== action.id && card)}
        case "UPDATE_PACK":
            return {
                ...state,
                cardPacks: state.cardPacks.map((card) => card._id === action.id ? {...card, name: action.name} : card)
            }
        default :
            return state
    }
}

//actions
export const setPacks = (packs: InitialStateType) => ({type: 'SET_PACKS', packs} as const)
export const addingPackAC = (pack: cardPack) => ({type: 'ADD_PACK', pack} as const)
export const deletePackAC = (id: string | null) => ({type: 'DELETE_PACK', id} as const)
export const updatePackAC = (id: string | null, name: string) => ({type: 'UPDATE_PACK', id, name} as const)

//thunks
export const getSetPacks = () => (dispatch: Dispatch) => {
    packsAPI.getPacks()
        .then(res => {
            dispatch(setPacks(res.data))
        })
        .catch((err) => {
            alert(err)
        })
}

export const getPacksSearchTC = (packName: string, min: number, max: number) => (dispatch: Dispatch) => {
    packsAPI.getPacksSearch(packName, min, max)
        .then((res) => {
            dispatch(setPacks(res.data))
        })
        .catch((err) => {
            console.log({...err})
        })
}

export const addingPackTC = () => (dispatch: Dispatch) => {
    packsAPI.addPack()
        .then((res: resType) => {
            dispatch(addingPackAC(res.data.newCardsPack))
        })
        .catch((err) => {
            console.log({...err})
        })
}

export const deletePackTC = (id: string | null) => (dispatch: Dispatch) => {
    packsAPI.deletePack(id)
        .then((res) => {
           dispatch(deletePackAC(id))
        })
        .catch((err) => {
            console.log({...err})
        })
}

export const updatePackTC = (id: string | null, name: string) => (dispatch: Dispatch) => {
    packsAPI.updatePack(id, name)
        .then((res) => {
            dispatch(updatePackAC(id, name))
        })
        .catch((err) => {
            console.log({...err})
        })
}

// types
export type InitialStateType = {
    cardPacks: Array<cardPack>
    page: number | null
    pageCount: number | null
    cardPacksTotalCount: number | null
    minCardsCount: number | null
    maxCardsCount: number | null
    token: string | null
    tokenDeathTime: number | null
}
export type cardPack = {
    _id: string | null
    user_id: string | null
    user_name: string | null
    private: boolean | null
    name: string | null
    path: string | null
    grade: number | null
    shots: number | null
    cardsCount: number | null
    type: string | null
    rating: number | null
    created: string | null
    updated: string | null
    more_id: string | null
    __v: number | null
    deckCover: null
}
type ActionsType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof addingPackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof deletePackAC>


type resType = {
    data: newCardsPackType
}
type newCardsPackType = {
    newCardsPack: cardPack
}
