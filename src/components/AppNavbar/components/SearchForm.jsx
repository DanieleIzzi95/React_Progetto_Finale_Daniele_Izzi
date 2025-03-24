import { useState } from "react"

export default function SearchForm({ onSubmit }) {
    const [input, setInput] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(input);
            setInput('')
        } else {
            console.error("onSubmit is not a function");
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="w-100 px-3 px-md-5 pb-1 border-0" role="search">
                <input
                    className="w-100 me-2 rounded-5 p-2 border-0"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    type="search"
                    placeholder="Cerca..."
                    aria-label="Search"
                />
            </form>
        </>
    )
}