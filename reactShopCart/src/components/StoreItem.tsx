import { Button, Card, NavItem } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const qty = 1

  return <Card className="h-100">
    <Card.Img variant="top" src={imgUrl} height='200px' style={{ objectFit: 'cover' }} />
    <Card.Body className="d-flex flex-column">
      <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
        <span className="fs-2">{name}</span>
        <span className="ms-2 text-muted">{formatCurrency(price)}</span>
      </Card.Title>
      <div className="mt-auto">
        {qty === 0 ?
          (<Button className="w-100">+ Add To Cart</Button>)
          :
          (<div className="d-flex align-items-center flex-column" style={{ gap: '.5rem' }}>
            <div className="d-flex aling-items-center justify-content-center" style={{ gap: '2rem' }}>
              <Button>-</Button>
              <div className="fs-3">{qty}</div>
              <Button>+</Button>
            </div>
            <Button variant="danger" size="sm">remove</Button>
          </div>)}
      </div>
    </Card.Body>
  </Card>
}