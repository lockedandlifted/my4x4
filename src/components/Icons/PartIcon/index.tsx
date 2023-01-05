import {
  GiSpring, GiSwordSpade, GiCarBattery, GiCarWheel, GiGearStickPattern,
} from 'react-icons/gi'
import { TbEngine } from 'react-icons/tb'
import { FaTruckMonster } from 'react-icons/fa'

const Icons = {
  accessories: GiSwordSpade,
  body: FaTruckMonster,
  electronics: GiCarBattery,
  engine: TbEngine,
  suspension: GiSpring,
  transmission: GiGearStickPattern,
  wheels_types: GiCarWheel,
} as const

type PartIconProps = {
  categoryKey?: string,
}

const PartIcon = (props: PartIconProps) => {
  const { categoryKey } = props

  if (!categoryKey) {
    return <TbEngine />
  }

  const IconComponent = Icons[categoryKey]

  return <IconComponent />
}

export default PartIcon
