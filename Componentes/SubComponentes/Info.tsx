import React from "react";
import Tipos from "../../Tipos";

interface InfoProps{
    Dados: {
        cpu: Tipos['cpu'],
        internal_hard_drive: Tipos['internal_hard_drive'],
        memory: Tipos['memory'],
        motherboard: Tipos['motherboard'],
        power_supply: Tipos['power_supply'],
        video_card: Tipos['video_card']
    },
    Input: string,
    Parte: Tipos['parte']
}

const Info = ({Dados, Input, Parte}:InfoProps) => {
    let Info:JSX.Element = <div></div>
    if(Input){
        const Dado = GetParte(Dados, Input, Parte)
        Info = (
            <ul>
                {Parte}:
                <li>
                    
                </li>
            </ul>
        )
    }
    return Info;
}

const GetParte = (Dados:InfoProps['Dados'], Input:string, Parte:Tipos['parte']) => {
    return (
        Parte === 'video_card' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.chipset === Input) :
        Parte === 'memory' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.speed === Input) :
        Parte === 'internal_hard_drive' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.capacity + ' ' + Dado.type === Input) :
        Parte === 'power_supply' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.wattage + ' ' + (typeof Dado.modular === 'string' ? Dado.modular + ' Modular' : '') === Input) :
        Parte === 'motherboard' ? Dados[Parte].find((Dado) => Dado.name + ' ' + Dado.socket_cpu === Input) :
        Dados[Parte].find((Dado) => Dado.name === Input)
    );
}

export default Info;