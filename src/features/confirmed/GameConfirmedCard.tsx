import Image from 'next/image';
import { Suspense } from 'react';

export default function GameConfirmedCard({ game }) {
  return (
    <Suspense fallback={<p>... Loading ...</p>}>
      <div className='flex grow justify-center border rounded shadow bg-slate-50'>
      <div className='flex flex-col gap-4 m-3 md:flex-row'>
          <Image
            className='w-auto h-auto'
            src={game?.image?.screen_url}
            width={300}
            height={300}
            alt={game?.name}
          />
          <div>
            <p className='flex wrap'>{game?.name}</p>
            <p className='text-xs'>{"Released: " + (game.original_release_date || game.expected_release_year || "N/A")}</p>
            <p>Description:</p>
            <p className='text-sm'>{game?.deck ? game?.deck : "No Description"}</p>
            {
              game?.platforms ?
                <>
                <p className='underline my-1'>Platform(s) Selected</p>
                  <div className='flex flex-wrap gap-1'>
                    {
                      game?.selectedPlatforms?.map(platform =>
                        <p key={game?.id + platform?.abbreviation} className='rounded-full text-xs bg-slate-600 text-white p-1'>{platform?.abbreviation}</p>)
                    }
                  </div>
                </>
                : <></>
            }
          </div>
        </div>
      </div>
    </Suspense>
  )
}
