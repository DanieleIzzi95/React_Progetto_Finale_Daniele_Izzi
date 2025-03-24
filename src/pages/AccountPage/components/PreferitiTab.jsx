import { Link } from 'react-router';
import FavContext from '../../../Context/FavContext';
import { useContext } from 'react';

export default function PreferitiTab() {
    const { fav } = useContext(FavContext);

    return (
        <>
            <div className="row justify-content-center column-gap-md-3 row-gap-md-1">
                <div className='row mt-5'>
                    <div className="col-12 px-0 mb-3 text-center text-md-start">
                        <h2 className='small-title'>I tuoi preferiti</h2>
                    </div>
                </div>
                {fav.length === 0 && <p>Non ci sono giochi preferiti al momento</p>}
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start  gap-2 p-0">
                    {fav.map((game) => (
                        <Link className='container-card-fav' to={`/game/${game.game_id}`} key={game.game_id}>
                            <div className="d-flex c-bg-lightDark rounded-2" >
                                <div className="col-4">
                                    <img className="img-fav rounded-2" src={game.game_image} alt={game.game_name} />
                                </div>
                                <div className="col-12 p-1">
                                    <p className="fav-title c-text-white mb-0 text-truncate" title={game.game_name}>{game.game_name}</p>
                                    <p className="message-chat-date">Aggiunto il: {new Date(game.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}