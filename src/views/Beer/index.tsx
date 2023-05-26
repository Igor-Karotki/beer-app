import {useEffect, useState} from 'react';
import {Beer as IBeer} from '../../types';
import {fetchData} from './utils';
import {useParams} from 'react-router-dom';
import beerImg from '../../api/beer.jpg';
import s from "./Beer.module.scss";

const Beer = () => {
    const {id} = useParams();
    const [beer, setBeer] = useState<IBeer>();

    useEffect(() => fetchData.bind(this, setBeer, id), [id]);

    return (
        <article>
            <div className={s.beerPreview}>
                <div className={s.imageContainer}>
                    <img className={s.beerImage} src={beerImg} alt="Hotel"/>
                    <div className={s.highlights}>
                        <div className={s.highlightsText}>
                            <h2>{beer?.name}</h2>
                            <p className={s.region}>{beer?.country}: {beer?.city}. {beer?.street} Street</p>
                        </div>
                        <div className={s.highlightsInfo}>
                            <h2 className={s.type}>Phone Number: {beer?.phone}</h2>
                            <a className={s.website} href={beer?.website_url}>{beer?.website_url}</a>
                        </div>
                    </div>
                </div>
                <div className={s.description}>
                      <strong className={s.type}>Brewery Type: {beer?.brewery_type}</strong>
                </div>
            </div>
        </article>
    );
};

export default Beer;
