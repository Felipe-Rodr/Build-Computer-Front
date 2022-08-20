import React, { createRef, forwardRef, useEffect, useRef, useState } from "react";
import Tipos from "../../Tipos";

interface AutoCompleteProps {
    className: string,
    Label: string,
    handleSubmit: (e:React.FormEvent, Input:string) => void,
    Clicked: boolean,
    Suggestions: string[]
}

interface SuggestionListProps {
    Input: string,
    ActiveSuggestion: number,
    FilteredSuggestion: string[],
    ShowSuggestion: boolean,
    handleClick: (e:React.MouseEvent<HTMLLIElement,MouseEvent>) => void
}

const AutoComplete = forwardRef(({className, Label, handleSubmit, Clicked, Suggestions}:AutoCompleteProps, AutoCompleteRef:React.ForwardedRef<HTMLInputElement>) => {
    const [Input, setInput] = useState('');
    const [ActiveSuggestion, setActiveSuggestion] = useState(0);
    const [FilteredSuggestion, setFilteredSuggestion] = useState<string[]>([]);
    const [ShowSuggestion, setShowSuggestion] = useState(false);
    const ScrollRef = useRef<HTMLUListElement>(null);
    useEffect(() => {
        setFilteredSuggestion([]);
    }, [Suggestions])
    useEffect(() => {
        if(!Clicked){
            setInput('');
        }
    },[Clicked])
    useEffect(() => {
        setInput(FilteredSuggestion[ActiveSuggestion])
    }, [ActiveSuggestion])
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const UserInput = e.currentTarget.value;
        const FilteredSuggestions = (Suggestions.filter(
            (Suggestion) => Suggestion.toLowerCase().indexOf(UserInput.toLowerCase()) > -1));
        setActiveSuggestion(0);
        setFilteredSuggestion(FilteredSuggestions);
        setShowSuggestion(true);
        setInput(e.currentTarget.value);
    }
    const handleClick = (e:React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setActiveSuggestion(0);
        setFilteredSuggestion([e.currentTarget.innerText]);
        setShowSuggestion(false);
        setInput(e.currentTarget.innerText);
    }
    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            if(Input !== ''){
                setActiveSuggestion(0);
                setShowSuggestion(false);
            }
        } else if(e.key === 'ArrowUp'){
            if(ActiveSuggestion === 0){
                return;
            }
            setActiveSuggestion(ActiveSuggestion-1);
            ScrollRef.current?.scrollBy({
                top:-40,
                behavior:'auto'
            });
        } else if(e.key === 'ArrowDown'){
            if(ActiveSuggestion-1 === FilteredSuggestion.length){
                return;
            }
            setActiveSuggestion(ActiveSuggestion+1);
            ScrollRef.current?.scrollBy({
                top:40,
                behavior:'auto'
            });
        }
    }
    const handleFocus = (e:React.FocusEvent<HTMLInputElement,Element>) => {
        setShowSuggestion(true);
    }
    const handleBlur = (e:React.FocusEvent<HTMLInputElement,Element>) => {
        setTimeout(() => {
            setShowSuggestion(false);
        }, 100);
    }
    return (
        <form className={className} onSubmit={(e) => {
            handleSubmit(e, Input);
            setInput('');
            }}>
            {Label}:
            <fieldset 
                className="text-black mt-1"
                disabled={Clicked ? false : true}>
                <label>
                    <input
                        ref={AutoCompleteRef}
                        className="border-solid border-1 rounded border-blue-600 p-2 w-full"
                        type='text'
                        value={Input || ''}
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onFocus={(e) => handleFocus(e)}
                        onBlur={(e) => handleBlur(e)}
                    />
                    <SuggestionList
                        ref={ScrollRef}
                        Input={Input}
                        ActiveSuggestion={ActiveSuggestion}
                        FilteredSuggestion={FilteredSuggestion}
                        ShowSuggestion={ShowSuggestion && Clicked ? true : false}
                        handleClick={handleClick}
                    />
                </label>
            </fieldset> 
        </form>
    )
})

const SuggestionList = forwardRef(({Input, ActiveSuggestion, FilteredSuggestion, ShowSuggestion, handleClick}: SuggestionListProps, ScrollRef: React.ForwardedRef<HTMLUListElement>) => {
    let SuggestionListComponent:JSX.Element = <div></div>;
    if(ShowSuggestion && Input){
        if(FilteredSuggestion.length){
            SuggestionListComponent = (
                <ul ref={ScrollRef} className="rounded border-solid border-2 border-blue-600 mt-0 max-h-36 list-none overflow-y-auto pl-0 w-[calc(300px + 1rem)]">
                    {FilteredSuggestion.map((Suggestion, Index) => {
                        let className:string = "p-2 bg-white hover:bg-blue-400 hover:cursor-pointer hover:font-bold";
                        if(Index === ActiveSuggestion){
                            className += " bg-blue-400 cursor-pointer font-bold ";
                        }
                        return (
                            <li className={className} key={Suggestion} onClick={handleClick}>
                                {Suggestion}
                            </li>
                        )
                    })}
                </ul>
            )
        } 
    } else {
        SuggestionListComponent = (
            <div className="p-2 text-blue-500">
                <em>
                    Nenhuma sugestão disponível.
                </em>
            </div>
        )
    }
    return SuggestionListComponent;
})

export default AutoComplete;