import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Beer} from "../../types";
import {fetchData} from "./utils";

const PageSize = 7;

const useBeerList = (currentPage: number, query: string) => {
    const navigate = useNavigate();
    const [sorted, setSorted] = useState({sorted: "id", reversed: false});
    const [beerList, setBeerList] = useState<Array<Beer>>([]);

    useEffect(() => fetchData.bind(this, setBeerList), []);

    const filteredItems = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return beerList.filter(beer => {
            return beer.name.toLowerCase().includes(query.toLowerCase())
        }).slice(firstPageIndex, lastPageIndex)
    }, [beerList, query, currentPage])

    const sortByType = () => {
        const beerListCopy = [...beerList];
        beerListCopy.sort((beerA, beerB) => {
            if (sorted.reversed) {
                return beerB.brewery_type.localeCompare(beerA.brewery_type);
            }
            return beerA.brewery_type.localeCompare(beerB.brewery_type);
        });
        setBeerList(beerListCopy);
        setSorted({sorted: "name", reversed: !sorted.reversed});
    };

    const onBeerClick = (id: string) => navigate(`/beer/${id}`);

    return {
        beerList,
        filteredItems,
        PageSize,
        sortByType,
        onBeerClick
    };
};

export default useBeerList;
