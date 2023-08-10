import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import {filterSearch} from "../redux/actions/listingsActions";

type SearchProps = {
    search : (input:string) => void;
}

const Search = ({ search }: SearchProps) => {

    const [input, setInput] = useState<string>('');
    const dispatch = useDispatch();
    console.log(input);

    const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const searchHandle = () => {
        dispatch(filterSearch(input))
        search(input);
    }

    return (
        <form>
            <label>
                <div>여행지</div>
                <input onChange={inputHandle} type="text" placeholder="여행지 입력" />
            </label>
            <button type='button' onClick={searchHandle}>검색</button>
        </form>
    )
}

export default Search;
