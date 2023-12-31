export const dynamic = 'force-dynamic';

import Pagination from '@/features/search/Pagination';
import SearchBar from '@/features/search/SearchBar';
import GameCard from '@/features/search/GameCard';
import getGames from '@/lib/getGames';
import { Suspense } from 'react';

export default async function Page({ searchParams }) {
  const gamesData = await getGames(searchParams);
  const games = gamesData.results;
  const gameLimit = 20
  const totalPages = Math.ceil(gamesData.number_of_total_results / gameLimit);

  const PaginationComponent = () => {
    return (
      <Suspense fallback={<p>... Loading ...</p>}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    )
  }
  return (
    <div>
      <Suspense fallback={<p>... Loading ...</p>}>
        <SearchBar />
      </Suspense>
      <PaginationComponent />
      {
        !!games && games.length != 0 ?
          <div className='grid gap-1 grid-cols-1 md:grid-cols-4'>
            {
              games?.map(game => <GameCard key={game.id} game={game} />)
            }
          </div> :
          <div className='flex justify-center'>No game matches your search :(</div>
      }
      <PaginationComponent />
    </div>
  );
}





