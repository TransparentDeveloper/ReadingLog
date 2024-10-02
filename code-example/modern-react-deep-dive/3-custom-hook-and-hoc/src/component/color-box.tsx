type ColorBoxProps = {
  color: string
}

const ColorBox = ({ color }: ColorBoxProps) => {
  console.log(color)
  return (
    <div
      style={{
        backgroundColor: color,
        width: '50px',
        height: '50px',
        borderRadius: '20px',
        transitionDuration: '200ms',
      }}
    />
  )
}

export default ColorBox
