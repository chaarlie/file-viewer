import { memo, MouseEvent } from 'react'

function UploadedFileSearchForm() {
    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    return (
        <form className="h-[3.5rem] grid grid-cols-5 gap-3">
            <input
                disabled={true}
                type="text"
                name="search"
                className="border-slate-300 border h-full col-span-4 px-3 py-2 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-lg sm:text-sm focus:ring-1"
            />
            <button
                onClick={handleClick}
                className="bg-sky-400 hover:bg-sky-500 col-span-1 h-full rounded-lg p-1 text-white  hover:text-slate-50 text-lg"
            >
                Go
            </button>
        </form>
    )
}

export default memo(UploadedFileSearchForm)
