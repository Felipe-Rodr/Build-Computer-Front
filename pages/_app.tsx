import '../styles/globals.css'
import Index from '.'
import Tipos from '../Tipos';

function MyApp() {
  const Dados = GetDados();
  return (
    <Index
      Dados={Dados}
    />
  );
}

const GetDados = () => {
  const Dados = {
    cpu: require('../data/raw/cpu.json') as Tipos['cpu'],
    internal_hard_drive: require('../data/raw/internal-hard-drive.json') as Tipos['internal_hard_drive'],
    memory: require('../data/raw/memory.json') as Tipos['memory'],
    motherboard: require('../data/raw/motherboard.json') as Tipos['motherboard'],
    power_supply: require('../data/raw/power-supply.json') as Tipos['power_supply'],
    video_card: require('../data/raw/video-card.json') as Tipos['video_card']
  }
  return Dados;
}

export default MyApp