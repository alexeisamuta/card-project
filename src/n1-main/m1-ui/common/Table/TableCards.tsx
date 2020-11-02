import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './Table.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../m2-bll/store';
import {
    addingPackTC,
    cardPack,
    deletePackTC,
    updatePackTC,
    getPacksAndMyPacksWithSearchTC
} from '../../../m2-bll/reducers/packsReducer';
import {initialStateGetRequestType, setSortPacksAC} from "../../../m2-bll/reducers/dataForGetRequestReducer";
import {addingCardTC, deleteCardTC, updateCardTC} from "../../../m2-bll/reducers/cardsReducer";


type PropsType = {
    packId: string
}

export const TableCards = React.memo((props:PropsType) => {


    const cards = useSelector(((state:RootState) => state.cards.cards))
    const dispatch = useDispatch()


    const onClickAddCard = () => {
        dispatch(addingCardTC(props.packId))
    }

    const onClickDeletePack = (id: string | null) => {
        dispatch(deleteCardTC(id))
    }

    const onClickUpdatePack = (id: string | null, question: string, comments: string) => {
        dispatch(updateCardTC(id, question, comments))
    }


    const renderRows = () => cards.map(row =>
        <tr key={row._id}>
            <td>{row.question}</td>
            <td>{row.answer}</td>
            <td>{row.grade}</td>
            <td>{row.updated}</td>
            <td>
                <button>delete</button>
            </td>
            <td>
                <button>update</button>
            </td>
        </tr>
    )

    return (
        <div>
            <table className={Styles.table}>
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Grade</th>
                    <th>Update</th>
                    <th>Url</th>
                    <th>
                        <button onClick={()=> onClickAddCard()}>Add</button>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {renderRows()}
                </tbody>
            </table>
        </div>
    );
})