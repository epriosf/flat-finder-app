import FlatFilter from '../Commons/FlatFilter';
import FlatOrder from '../Commons/FlatOrder';

interface FlatTitleProps {
  title: string;
}
const FlatTitle: React.FC<FlatTitleProps> = ({ title }) => {
  return (
    <div className="flex justify-content-between w-full align-items-center mb-3">
      <h1 className="font-normal">{title}</h1>
      <div className="flex gap-3">
        <FlatOrder />
        <FlatFilter />
      </div>
    </div>
  );
};

export default FlatTitle;
