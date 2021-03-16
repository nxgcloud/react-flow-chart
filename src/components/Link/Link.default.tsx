import { isEqual } from 'lodash'
import * as React from 'react'
import { useCustomCompareMemo } from 'use-custom-compare'
import { generateCurvePath, generateRightAnglePath, generateSmartPath, IConfig, ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IPort, IPosition } from '../../'
import { ArrowLink, RegularLink } from './variants'

export interface ILinkDefaultProps {
  className?: string
  config: IConfig
  link: ILink
  startPos: IPosition
  endPos: IPosition
  fromPort: IPort
  toPort?: IPort
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  isHovered: boolean
  isSelected: boolean
  matrix?: number[][]
}

export const LinkDefault = (props: ILinkDefaultProps) => {
  const { config, startPos, endPos, fromPort, toPort, matrix } = props
  const points = config.smartRouting
    ? !!toPort && !!matrix
      ? useCustomCompareMemo(
        () => generateSmartPath(matrix, startPos, endPos, fromPort, toPort),
        [config, matrix, startPos, endPos, fromPort, toPort],
        (prevDeps, nextDeps) => {
          if (nextDeps[0].virtualize === true) {
            return false
          }
          return isEqual(prevDeps, nextDeps)
        },
      )
      : generateRightAnglePath(startPos, endPos)
    : generateCurvePath(startPos, endPos)

  const linkColor: string =
    (fromPort.properties && fromPort.properties.linkColor) || 'cornflowerblue'

  const linkProps = {
    ...props,
    config,
    points,
    linkColor,
    startPos,
    endPos,
  }

  return config.showArrowHead
    ? <ArrowLink {...linkProps} />
    : <RegularLink {...linkProps} />
}
