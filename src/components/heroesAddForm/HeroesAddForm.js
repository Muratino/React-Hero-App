import { useState, useEffect } from "react";
import { useHttp } from '../../hooks/http.hook';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import { heroesFetching, newHeroesFetched, heroesFetchingError } from '../../reducers/heroesSlice';
import { useDispatch } from 'react-redux';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const [arrFilter, setArrFilter] = useState([]);

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => setArrFilter(data));
    }, []);

    const renderFilterList = (arr) => {
        if (arr.length === 0) {
            return <option>Фильтры не найдены :(</option>
        }
        return arr.map(({ id, name, value }) => {
            return <option key={id} value={value}>{name}</option>
        })
    }

    const elements = renderFilterList(arrFilter);

    const addNewHero = (hero) => {
        const id = uuidv4();
        const newHero = { "id": `${id}`, ...hero, description: hero.text };
        const newArr = JSON.stringify(newHero);

        dispatch(heroesFetching());
        request("http://localhost:3001/heroes", 'POST', newArr)
            .then(data => dispatch(newHeroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    text: '',
                    element: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Минимум 2 символа')
                        .required('Обязательное поле!'),
                    text: Yup.string()
                        .required('Обязательное поле!'),
                    element: Yup.string().required('Выберите стихию'),
                })}
                onSubmit={(values, { resetForm }) => {
                    addNewHero((values));
                    resetForm({
                        name: '',
                        text: '',
                        element: '',
                    })
                }}
            >
                <Form className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <Field
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Как меня зовут?" />
                        <ErrorMessage className='error' name='name' component='div' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="text" className="form-label fs-4">Описание</label>
                        <Field
                            name="text"
                            as='textarea'
                            className="form-control"
                            id="text"
                            placeholder="Что я умею?"
                            style={{ "height": '130px' }} />
                        <ErrorMessage className='error' name='text' component='div' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <Field
                            as='select'
                            className="form-select"
                            id="element"
                            name="element">
                            {elements}
                        </Field>
                        <ErrorMessage className='error' name='element' component='div' />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary">Создать</button>
                </Form>
            </Formik >
        </>
    )
}

export default HeroesAddForm;