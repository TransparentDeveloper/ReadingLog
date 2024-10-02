type CardProps = {
  title: string
  content: string
}

const Card = ({ title, content }: CardProps) => {
  return (
    <div className="bg-red-500 rounded-lg p-4 w-64 h-80">
      <h2 className="font-bold text-lg bg-blue-500">{title}</h2>
      <p>{content}</p>
    </div>
  )
}

export default Card
