import {useEffect, useState} from "react";
import {Beer} from "../../types";
import {fetchData} from "./utils";

const useHome = () => {
    const [beerList, setBeerList] = useState<Array<Beer>>([]);
    const [storageItems, setStorageItems] = useState(() => JSON.parse(localStorage.getItem("favourites") || "[]"))

    useEffect(() => fetchData.bind(this, setBeerList), []);

    const handleToggleFavourite = (id: string) => {
        const isFavourite = storageItems.includes(id)
        if (!isFavourite) {
            const oldStorageItems = JSON.parse(localStorage.getItem("favourites") || "[]")
            const newStorageItems = [...oldStorageItems, id]
            setStorageItems(newStorageItems);
            localStorage.setItem("favourites", JSON.stringify(newStorageItems))
        } else {
            const newStorageItems = storageItems.filter((savedId: string) => savedId !== id)
            setStorageItems(newStorageItems);
            localStorage.setItem("favourites", JSON.stringify(newStorageItems))
        }
    }

    const ClearLocalStorage = () => {
        localStorage.clear()
        setStorageItems([])
    }
    return {
        beerList,
        storageItems,
        handleToggleFavourite,
        ClearLocalStorage
    };
};

export default useHome;
