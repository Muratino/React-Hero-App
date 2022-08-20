import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetching, heroesFetched, heroesFetchingError } from '../../reducers/heroesSlice';

const HeroesListItem = ({ id, name, description, element }) => {
    const { heroes } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }


    const deletHero = () => {
        dispatch(heroesFetching());
        const newArr = heroes.filter(elem => elem.id !== id);
        dispatch(heroesFetched(newArr))


        httpDelet(id, newArr)
    }

    const httpDelet = (id, arr) => {
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(heroesFetched(arr)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    return (
        <li
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ 'objectFit': 'cover' }} />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button
                    type="button"
                    className="btn-close btn-close"
                    aria-label="Close"
                    onClick={deletHero} ></button>
            </span>
        </li>
    )
}

export default HeroesListItem;