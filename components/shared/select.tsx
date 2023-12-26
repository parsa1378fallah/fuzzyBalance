import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface selectorProps {
  classes: string;
  placeholder: string;
  defaultChart: string;
  items: {
    key: string;
    value: string;
  }[];
  handleChangeValue(value: string): void;
}

const Selector = ({
  placeholder,
  items,
  classes,
  defaultChart,
  handleChangeValue,
}: selectorProps) => {
  return (
    <>
      <Select
        value={defaultChart}
        onValueChange={(val) => handleChangeValue(val)}
      >
        <SelectTrigger className={classes}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <div key={item.value}>
              <SelectItem value={item.value}>{item.key}</SelectItem>
            </div>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
export default Selector;
