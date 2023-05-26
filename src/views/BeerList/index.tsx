import React, {SetStateAction, useState} from 'react';
import {Avatar, List, ListItemAvatar, ListItemButton, ListItemText, TextField, Button} from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import s from "./BeerList.module.scss";
import Pagination from "../../components/Pagination";
import useBeerList from './useBeerList';

const BeerList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const {
        beerList,
        filteredItems,
        PageSize,
        sortByType,
        onBeerClick
    } = useBeerList(currentPage, query);

    return (
        <article>
            <section>
                <header>
                    <h1>BeerList page</h1>
                </header>
                <main>
                    <div className={s.searchContainer}>
                        <TextField
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            type="search"
                            label='Filter...'
                            variant='outlined'/>
                        <Button
                            variant="contained"
                            onClick={sortByType}
                        >
                            <span>Sort By Brewery Type</span>
                        </Button>
                    </div>
                    <List>
                        {filteredItems.map((beer) => (
                            <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <SportsBar/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={beer.name} secondary={beer.brewery_type}/>
                            </ListItemButton>
                        ))}
                    </List>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={beerList.length}
                        pageSize={PageSize}
                        onPageChange={(page: SetStateAction<number>) => setCurrentPage(page)}
                    />
                </main>
            </section>
        </article>
    );
};

export default BeerList;
