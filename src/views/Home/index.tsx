import {Link as RouterLink} from 'react-router-dom';
import {Button, Paper, Link} from '@mui/material';
import s from './Home.module.scss';
import useHome from './useHome';

const Home = () => {
    const {
        beerList,
        storageItems,
        handleToggleFavourite,
        ClearLocalStorage
    } = useHome();

    return (
        <article>
            <section>
                <main>
                    <Paper>
                        <div className={s.listContainer}>
                            <ul className={s.list}>
                                {beerList.map((beer) => (
                                    <li key={beer.id}>
                                        <Button variant="contained" size="medium"
                                                onClick={() => handleToggleFavourite(beer.id)}>
                                            add
                                        </Button>
                                        <Link underline="hover" component={RouterLink} to={`/beer/${beer.id}`}>
                                            {beer.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Paper>

                    <Paper>
                        <div className={s.listContainer}>
                            <div className={s.listHeader}>
                                <h3>Saved items</h3>
                                <Button onClick={ClearLocalStorage} variant='contained' size='small'>
                                    Remove all items
                                </Button>
                            </div>
                            <ul className={s.list}>
                                {beerList.map((beer) => (
                                    storageItems.includes(beer.id) && (<li key={beer.id}>
                                            <Button variant="contained" size="medium"
                                                    onClick={() => handleToggleFavourite(beer.id)}>
                                                delete
                                            </Button>
                                            <Link underline="hover" component={RouterLink} to={`/beer/${beer.id}`}>
                                                {beer.name}
                                            </Link>
                                        </li>
                                    )
                                ))}
                                {!storageItems.length && <p>No saved items</p>}
                            </ul>
                        </div>
                    </Paper>
                </main>
            </section>
        </article>
    );
};

export default Home;
