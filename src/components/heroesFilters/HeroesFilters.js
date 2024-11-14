import { useState, useEffect } from "react";
import { useHttp } from '../../hooks/http.hook';

import { heroesFetching, newHeroesFetched, heroesFetched, heroesFetchingError } from '../../reducers/heroesSlice'; // eslint-disable-line
import { useDispatch } from 'react-redux';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const [arrFilters, setArrFilters] = useState([]);

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => setArrFilters(data));
    }, []); // eslint-disable-line

    const filterHero = (e, value) => {
        const event = e.target;
        const btn = document.querySelectorAll('.my-btn');
        btn.forEach(elem => {
            elem.classList.remove('active');
            event.classList.add('active');
        })

        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes${value === 'all' ? '' : `?element=${value}`}`)
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    const renderFilterList = (arr) => {
        if (arr.length === 0) {
            return <option>Фильтры не найдены :(</option>
        }
        return arr.map(({ id, title, classNames, value }) => {
            return <button
                key={id}
                className={`btn ${classNames} my-btn`}
                onClick={(e) => filterHero(e, value)} >{title}</button>
        })
    }

    const elements = renderFilterList(arrFilters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;