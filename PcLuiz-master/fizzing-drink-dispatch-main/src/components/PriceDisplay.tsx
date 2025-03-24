interface PriceDisplayProps {
  price: number;
  discount?: number;
  finalPrice: number;
}

export const PriceDisplay = ({ price, discount, finalPrice }: PriceDisplayProps) => {
  return (
    <div className="text-right">
      {discount && (
        <span className="text-sm line-through text-muted-foreground">
          R$ {price.toFixed(2)}
        </span>
      )}
      <div className="text-lg font-bold">
        R$ {finalPrice.toFixed(2)}
      </div>
    </div>
  );
};