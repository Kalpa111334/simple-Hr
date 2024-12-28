import { useNavigate } from '@remix-run/react'
import { Flex, Typography } from 'antd'
import React, { ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  isLabel?: boolean
}

export const Logo: React.FC<Props> = ({
  height = 50,
  isLabel = false,
  style,
  ...props
}) => {
  const router = useNavigate()

  const goTo = (url: string) => {
    router(url)
  }

  return (
    <Flex align="center" gap={10} onClick={() => goTo('/home')}>
      <img
        src={"https://xwaydesigns.com/images/ams-image.jpeg"}
        {...props}
        alt="Logo"
        height={"55"}
        style={{"borderRadius":"5px","cursor":"pointer","objectFit":"contain","height":"55px"}}
        onError={event => {
          const target = event.target as HTMLImageElement
          target.onerror = null
          target.src = 'https://i.imgur.com/2dcDGIE.png'
        }}
      />
      {isLabel && (
        <Typography.Title level={4} style={{ margin: '0px' }}>
          Employee Management
        </Typography.Title>
      )}
    </Flex>
  )
}
