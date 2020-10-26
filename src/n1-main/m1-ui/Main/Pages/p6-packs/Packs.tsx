import React, {useState} from 'react';
import {Table} from "../../../common/Table/Table";
import {CommonSlider} from "../../../common/CommonSlider/CommonSlider";
import {useFormik} from "formik";
import {Input} from "../../../common/Input/Input";
import {Button} from "../../../common/Button/Button";
import style from "./Packs.module.css"

const data = [
    {
        id: 1,
        name: 'update new pack 2.00',
        cardsCount: 2,
        update: '10-25T15:54'
    },

    {
        id: 2,
        name: 'update new pack 2.00',
        cardsCount: 2,
        update: '10-25T15:54'
    },

    {
        id: 3,
        name: 'update new pack 2.00',
        cardsCount: 2,
        update: '10-25T15:54'
    }
]

export const Packs = () => {
    const [value, setValue] = useState([0, 100])

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit: values => {
            alert(values.search)
            alert(value[0])
            alert(value[1])
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className={style.formStyle}>
                <Input placeholder={"Search"}
                       id="search"
                       name="search"
                       type="text"
                       {...formik.getFieldProps('search')}
                />
                <CommonSlider value={value}
                              setValue={setValue}
                              min={0}
                              max={100}/>
                <div>
                    <Button type="submit" name={"Search"}/>
                </div>
            </form>

            <h1>Packs</h1>
            <Table data={data}/>
        </>
    )


}