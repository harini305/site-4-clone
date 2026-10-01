import {
  PiCouch,
  PiPlant,
  PiLamp,
  PiFrameCorners,
  PiBathtub,
  PiFlowerTulip,
  PiCookingPot,
  PiBed,
  PiDresser,
  PiChair,
  PiTelevisionSimple,
  PiDesk,
} from 'react-icons/pi';

const icons = {
  sofa: PiCouch,
  plant: PiPlant,
  lamp: PiLamp,
  mirror: PiFrameCorners,
  bath: PiBathtub,
  stool: PiFlowerTulip,
  pot: PiCookingPot,
  bed: PiBed,
  cabinet: PiDresser,
  chair: PiChair,
  console: PiTelevisionSimple,
  desk: PiDesk,
};

export default function CategoryIcon({ name, className }) {
  const Icon = icons[name] || PiCouch;
  return <Icon aria-hidden="true" className={className} />;
}
