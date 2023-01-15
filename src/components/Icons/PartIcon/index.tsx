import {
  GiCampingTent,
  GiCarBattery,
  GiCarWheel,
  GiGearStickPattern,
  GiHealingShield,
  GiRadioTower,
  GiSkippingRope,
  GiSpring,
  GiSwordSpade,
} from 'react-icons/gi'
import { TbEngine, TbArrowAutofitUp } from 'react-icons/tb'
import { FaTruckMonster } from 'react-icons/fa'
import { MdOutlineRotate90DegreesCcw, MdWbTwighlight } from 'react-icons/md'

const Icons = {
  accessories: GiSwordSpade,
  body: FaTruckMonster,
  camp: GiCampingTent,
  communications: GiRadioTower,
  driveline: MdOutlineRotate90DegreesCcw,
  electronics: GiCarBattery,
  engine: TbEngine,
  lighting: MdWbTwighlight,
  protection: GiHealingShield,
  recovery: GiSkippingRope,
  roof: TbArrowAutofitUp,
  suspension: GiSpring,
  transmission: GiGearStickPattern,
  wheels_types: GiCarWheel,
} as const

type PartIconProps = {
  categoryKey?: string,
}

const PartIcon = (props: PartIconProps) => {
  const { categoryKey } = props

  const IconComponent = Icons[categoryKey]

  if (!categoryKey || !IconComponent) {
    return <TbEngine />
  }

  return <IconComponent />
}

export default PartIcon
