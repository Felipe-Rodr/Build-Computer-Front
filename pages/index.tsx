import React, { useRef } from 'react';
import Content from '../PageStructure/Content';
import Header from '../PageStructure/Header';
import Tipos from '../Tipos';

interface IndexProps {
  Dados: {
    cpu: Tipos['cpu'],
    internal_hard_drive: Tipos['internal_hard_drive'],
    memory: Tipos['memory'],
    motherboard: Tipos['motherboard'],
    power_supply: Tipos['power_supply'],
    video_card: Tipos['video_card']
  };
}

const Index = ({Dados}:IndexProps) => {
  return (
    <div className="bg-[#373737ff] h-full overflow-auto">
      <Header/>
      <Content
        Dados={Dados}
      />
    </div> 
  );
}

export default Index;