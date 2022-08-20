import React from 'react'
import ComputadorBuilder from '../Componentes/ComputadorBuilder';
import Tipos from '../Tipos';
 
interface ContentProps {
    Dados: {
        cpu: Tipos['cpu'],
        internal_hard_drive: Tipos['internal_hard_drive'],
        memory: Tipos['memory'],
        motherboard: Tipos['motherboard'],
        power_supply: Tipos['power_supply'],
        video_card: Tipos['video_card']
    };
}

const Content = ({Dados}:ContentProps) => {
    return (
        <ComputadorBuilder
            Dados={Dados} 
        />
    );
}

export default Content;