import {
  GiSpring, GiSwordSpade, GiCarBattery, GiCarWheel, GiGearStickPattern, GiHealingShield, GiCampingTent, GiRadioTower, GiSkippingRope,
} from 'react-icons/gi'
import { TbEngine, TbArrowAutofitUp } from 'react-icons/tb'
import { FaTruckMonster } from 'react-icons/fa'
import { MdOutlineRotate90DegreesCcw, MdWbTwighlight } from 'react-icons/md'

const Icons = {
  accessories: GiSwordSpade,
  body: FaTruckMonster,
  barwork: GiHealingShield,
  camp: GiCampingTent,
  communications: GiRadioTower,
  driveline: MdOutlineRotate90DegreesCcw,
  electronics: GiCarBattery,
  engine: TbEngine,
  lighting: MdWbTwighlight,
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

  if (!categoryKey) {
    return <TbEngine />
  }

  const IconComponent = Icons[categoryKey]

  return <IconComponent />
}

export default PartIcon
