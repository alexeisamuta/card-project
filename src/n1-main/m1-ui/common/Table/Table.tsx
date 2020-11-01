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


export const Table = React.memo(() => {

    console.log("Table rendering")

    const newName = "new checked name"
    const userID = useSelector<RootState, string>(state => state.profile._id)
    const {page, pageCount, checkedMyPacks, packName, min, max} = useSelector<RootState, initialStateGetRequestType>(state => state.dataGetRequest)
    const packs = useSelector<RootState, Array<cardPack>>(state => state.packs.cardPacks)
    const dispatch = useDispatch()


    const onClickAddPack = () => {
        dispatch(addingPackTC())
    }

    const onClickDeletePack = (id: string | null) => {
        dispatch(deletePackTC(id))
    }

    const onClickUpdatePack = (id: string | null, newName: string) => {
        dispatch(updatePackTC(id, newName))
    }

    const onClickDescendingSort = () => {
        dispatch(setSortPacksAC("0updated"))
        if (checkedMyPacks) {
            dispatch(getPacksAndMyPacksWithSearchTC(userID, packName, min, max, pageCount, page, "0updated"))
        } else {
            dispatch(getPacksAndMyPacksWithSearchTC("", packName, min, max, pageCount, page, "0updated"))
        }

    }

    const onClickAscendingSort = () => {
        dispatch(setSortPacksAC("1updated"))
        if (checkedMyPacks) {
            dispatch(getPacksAndMyPacksWithSearchTC(userID, packName, min, max, pageCount, page, "1updated"))
        } else {
            dispatch(getPacksAndMyPacksWithSearchTC("", packName, min, max, pageCount, page, "1updated"))
        }

    }

    const renderRows = () => packs.map(row =>
        <tr key={row._id}>
            <td>{row.name}</td>
            <td>{row.cardsCount}</td>
            <td>{row.updated}</td>
            <td>''</td>
            <td>
                <button onClick={() => onClickDeletePack(row._id)}>delete</button>
            </td>
            <td>
                <button onClick={() => onClickUpdatePack(row._id, newName)}>update</button>
            </td>
            <td><Link to={'#'}>cards</Link></td>
        </tr>
    )
    return (
        <table className={Styles.table}>
            <thead>
            <tr>
                <th>Name</th>
                <th>
                    CardsCount
                    <button className={Styles.arrow} onClick={onClickAscendingSort}>/\</button>
                    <button className={Styles.arrow} onClick={onClickDescendingSort}>\/</button>
                </th>
                <th>Update</th>
                <th>Url</th>
                <th>
                    <button onClick={onClickAddPack}>Add</button>
                </th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {renderRows()}
            </tbody>
        </table>
    );
})