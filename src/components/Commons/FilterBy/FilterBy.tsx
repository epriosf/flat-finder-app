import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef, useState } from 'react';
import { UserOutput } from '../../../types/User';

interface FilterByProps<T> {
  setItems: (items: T[]) => void;
  originalItems: T[];
  flatsCount?: Record<string, number>;
}

const FilterBy = <T extends UserOutput>({
  setItems,
  originalItems,
  flatsCount,
}: FilterByProps<T>) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);
  const [minRange, setMinRange] = useState<number | null>(null);
  const [maxRange, setMaxRange] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const op = useRef<OverlayPanel>(null);
  const handleMinValueChange = (e: InputNumberValueChangeEvent) => {
    setMinAge(e.value !== undefined ? e.value : null);
  };
  const handleMaxValueChange = (e: InputNumberValueChangeEvent) => {
    setMaxAge(e.value !== undefined ? e.value : null);
  };
  const handleMinRangeValueChange = (e: InputNumberValueChangeEvent) => {
    setMinRange(e.value !== undefined ? e.value : null);
  };
  const handleMaxRangeValueChange = (e: InputNumberValueChangeEvent) => {
    setMaxRange(e.value !== undefined ? e.value : null);
  };
  const handleButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let filteredUsers = [...originalItems];

    if (isAdmin) {
      filteredUsers = filteredUsers.filter((item: UserOutput) => item.isAdmin);
    }
    if (flatsCount) {
      if (minRange != null) {
        filteredUsers = filteredUsers.filter(
          (item: UserOutput) => flatsCount[item.email] >= minRange,
        );
      }
      if (maxRange) {
        filteredUsers = filteredUsers.filter(
          (item: UserOutput) => flatsCount[item.email] <= maxRange,
        );
      }
    }

    setItems(filteredUsers);

    if (isPanelOpen) {
      op.current?.hide(); // Close the panel
    } else {
      op.current?.toggle(e); // Open the panel
    }
    setIsPanelOpen(!isPanelOpen);
  };
  const clearFilterForm = () => {
    setIsAdmin(true);
    setMinAge(null);
    setMaxAge(null);
    setMinRange(null);
    setMaxRange(null);

    // Reset items to the original list
    setItems(originalItems);
  };

  return (
    <div className="card flex justify-content-center">
      <Button
        type="button"
        rounded
        icon="pi pi-filter"
        onClick={(e) => op.current?.toggle(e)}
      />
      <OverlayPanel
        ref={op}
        onHide={() => setIsPanelOpen(false)}
        style={{ width: '300px' }}
      >
        <form onSubmit={handleButtonClick} className="loginForm">
          <p>
            <i className="pi pi-user pr-2"></i>
            Age Range
          </p>
          <FloatLabel>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-user" />
              <InputNumber
                id="minNumber-input"
                value={minAge}
                onValueChange={handleMinValueChange}
                className="w-full left-3"
              />
            </IconField>
            <label htmlFor="minNumber-input" className="left-3 text-400">
              Min
            </label>
          </FloatLabel>

          <FloatLabel>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-user" />
              <InputNumber
                id="maxNumber-input"
                value={maxAge}
                onValueChange={handleMaxValueChange}
                className="w-full left-3"
              />
            </IconField>
            <label htmlFor="maxNumber-input" className="left-3 text-400">
              Max
            </label>
          </FloatLabel>
          <p>
            <i className="pi pi-user pr-2"></i>
            Flats Range
          </p>
          <FloatLabel>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-hashtag" />
              <InputNumber
                id="minFlats-input"
                value={minRange}
                onValueChange={handleMinRangeValueChange}
                className="w-full"
              />
            </IconField>
            <label htmlFor="minFlats-input">Min</label>
          </FloatLabel>
          <FloatLabel>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-hashtag" />
              <InputNumber
                id="maxFlats-input"
                value={maxRange}
                onValueChange={handleMaxRangeValueChange}
                className="w-full"
              />
            </IconField>
            <label htmlFor="maxFlats-input">Max</label>
          </FloatLabel>

          <div className="flex align-items-center mt-3">
            <InputSwitch
              checked={isAdmin}
              onChange={(e: InputSwitchChangeEvent) => setIsAdmin(e.value)}
              className="mr-3"
            />
            <span>Is Admin</span>
          </div>
          <Button label="Filter" className="w-full mt-5" type="submit" />
          <Button
            label="Clear Filter"
            className="w-full mt-5"
            onClick={clearFilterForm}
            type="button"
          />
        </form>
      </OverlayPanel>
    </div>
  );
};

export default FilterBy;
