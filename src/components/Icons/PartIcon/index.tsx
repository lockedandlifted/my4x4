import Accessories from './Icons/Accessories'
import Body from './Icons/Body'
import Camping from './Icons/Camping'
import Communications from './Icons/Communications'
import Driveline from './Icons/Driveline'
import Electronics from './Icons/Electronics'
import Engine from './Icons/Engine'
import Lighting from './Icons/Lighting'
import Protection from './Icons/Protection'
import Recovery from './Icons/Recovery'
import Roof from './Icons/Roof'
import Suspension from './Icons/Suspension'
import Transmission from './Icons/Transmission'
import Wheels from './Icons/Wheels'

const Icons = {
  accessories: Accessories,
  body: Body,
  camping_gear: Camping,
  communications: Communications,
  driveline: Driveline,
  electronics: Electronics,
  engine: Engine,
  lighting: Lighting,
  protection: Protection,
  recovery: Recovery,
  roof: Roof,
  suspension: Suspension,
  transmission: Transmission,
  wheels_tyres: Wheels,
} as const

type PartIconProps = {
  categoryKey?: string,
}

const PartIcon = (props: PartIconProps) => {
  const { categoryKey } = props

  const IconComponent = Icons[categoryKey]

  if (!categoryKey || !IconComponent) {
    return <Engine height={20} width={20} />
  }

  return <IconComponent height={20} width={20} />
}

export default PartIcon
