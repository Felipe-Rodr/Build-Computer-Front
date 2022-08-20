import React, { SetStateAction, useRef, useState } from "react";
import { useEffect } from "react";
import Tipos from '../Tipos';
import AutoComplete from "./SubComponentes/AutoComplete";
import Buttons from "./SubComponentes/Buttons";
import Info from "./SubComponentes/Info";

interface ComputadorBuilderProps {
    Dados: {
        cpu: Tipos['cpu'],
        internal_hard_drive: Tipos['internal_hard_drive'],
        memory: Tipos['memory'],
        motherboard: Tipos['motherboard'],
        power_supply: Tipos['power_supply'],
        video_card: Tipos['video_card']
    };
}

const ComputadorBuilder = ({Dados}:ComputadorBuilderProps) => {
    const [Clicked, setClicked] = useState(false);
    const [Parte, setParte] = useState<Tipos['parte']>('motherboard');
    const [Montagem, setMontagem] = useState<string[]>([]);
    const [MontagemPartes, setMontagemPartes] = useState<Tipos['parte'][]>([]);
    const AutoCompleteRef = useRef<HTMLInputElement>(null)
    let SuggestionsArray: string[] = GetSuggestionsArray({Dados}, Parte);
    useEffect(() => {
        if(Clicked){
            AutoCompleteRef.current?.focus();
        } 
    }, [Clicked])
    const handleSubmit = (e:React.FormEvent, Input:string) => {
        e.preventDefault();
        if(Input !== '' && SuggestionsArray.find((Suggestion) => Suggestion === Input ? true : false)){
            setMontagemPartes([...MontagemPartes, Parte]);
            setMontagem([...Montagem, Input]);
            setClicked(false);
        } else {
            alert('Input invalido');
        }
    }
    const handleClickButton = {
        ColocarParte : (Parte:Tipos['parte']) => {
            setClicked(Clicked ? false : true);
            if(!Clicked){
                setParte(Parte);
            } 
        },
        RetirarParte : (Parte:Tipos['parte']) => {
            let Index = MontagemPartes.findIndex((Partes) => Partes === Parte);
            setMontagemPartes(MontagemPartes.filter((Partes) => Partes !== Parte));
            setMontagem(Montagem.filter((Partes) => Montagem.indexOf(Partes) !== Index));
        }
    }
    
    return (
        <div className="flex flex-col w-full h-fit">
            <AutoComplete
                ref={AutoCompleteRef}
                className="w-[calc(220px + 1rem)] m-7 text-blue-500 italic"
                Label={TraduzirParte(Parte)}
                handleSubmit={handleSubmit} 
                Clicked={Clicked}
                Suggestions={SuggestionsArray}
            />
            <div className="relative left-[25%] h-fit w-fit">
                <img className="m-5 w-96 " src="/Computador_case.png" alt="gabineteImg" />
                <Buttons
                    Clicked={Clicked}
                    MontagemPartes={MontagemPartes}
                    handleClickButton={handleClickButton}
                    TraduzirParte={TraduzirParte}
                />
            </div>
            {Montagem.map((Parte, Index) => 
                <Info
                    key={Index}
                    Dados={Dados}
                    Input={Parte}
                    Parte={MontagemPartes[Index]}
                />)
            }
        </div>
    )
}

const TraduzirParte = (Parte:Tipos['parte']) => {
    return (
        Parte === 'video_card' ? 'Placa de video':
        Parte === 'memory' ? 'Memoria':
        Parte === 'internal_hard_drive' ? 'HDD/SSD':
        Parte === 'power_supply' ? 'Fonte de energia':
        Parte === 'motherboard' ? 'Placa-mae':
        'Processador'
    )
}

const GetSuggestionsArray = ({Dados}:ComputadorBuilderProps, Parte:Tipos['parte']) => {
    let SuggestionsArray:string[] = []
    Parte === 'video_card' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.chipset)) :
    Parte === 'memory' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.speed)) :
    Parte === 'internal_hard_drive' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.capacity + ' ' + Dado.type)) :
    Parte === 'power_supply' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.wattage + ' ' + (typeof Dado.modular === 'string' ? Dado.modular + ' Modular' : ''))) :
    Parte === 'motherboard' ? Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name + ' ' + Dado.socket_cpu)) :
    Dados[Parte].forEach((Dado) => SuggestionsArray.push(Dado.name));
    const SuggestionsSet = new Set(SuggestionsArray);
    SuggestionsArray = Array.from(SuggestionsSet);
    return SuggestionsArray; 
}

export default ComputadorBuilder;