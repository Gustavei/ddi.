interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="w-8 h-8 flex items-center justify-center border rounded-md"
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="w-8 h-8 flex items-center justify-center border rounded-md"
      >
        +
      </button>
    </div>
  );
};