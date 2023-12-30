import PacmanLoader from "react-spinners/PacmanLoader";

export default function LoadingSkeleton () {
  return (
    <div className="flex h-full items-center align-center justify-center">
      <PacmanLoader
        color={'#475569'}
        size={16} />
    </div>
  )
}
