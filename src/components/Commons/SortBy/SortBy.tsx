import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
type SortByProps = {
  sortUsersByFirstName: (order: 'asc' | 'desc') => void;
  sortUsersByLastName: (order: 'asc' | 'desc') => void;
  sortUsersByFlatsCount: (order: 'asc' | 'desc') => void;
};

export const SortBy: React.FC<SortByProps> = ({
  sortUsersByFirstName,
  sortUsersByLastName,
  sortUsersByFlatsCount,
}) => {
  const menu = useRef<Menu>(null);
  const toast = useRef<Toast>(null);
  const items: MenuItem[] = [
    {
      label: 'FirstName',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Asc',
          icon: 'pi pi-sort-alpha-up',
          command: () => sortUsersByFirstName('asc'),
        },
        {
          label: 'Desc',
          icon: 'pi pi-sort-alpha-up-alt',
          command: () => sortUsersByFirstName('desc'),
        },
      ],
    },
    {
      label: 'LastName',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Asc',
          icon: 'pi pi-sort-alpha-up',
          command: () => sortUsersByLastName('asc'),
        },
        {
          label: 'Desc',
          icon: 'pi pi-sort-alpha-up-alt',
          command: () => sortUsersByLastName('desc'),
        },
      ],
    },
    {
      label: 'No. Flats',
      icon: 'pi pi-hashtag',
      items: [
        {
          label: 'Asc',
          icon: 'pi pi-sort-alpha-up',
          command: () => sortUsersByFlatsCount('asc'),
        },
        {
          label: 'Desc',
          icon: 'pi pi-sort-alpha-up-alt',
          command: () => sortUsersByFlatsCount('desc'),
        },
      ],
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <Menu model={items} popup ref={menu} id="popup_menu_right" />
      <Button
        icon="pi pi-sort-alt"
        rounded
        className="bg-indigo-200"
        onClick={(event) => menu.current!.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      />
      <Menu
        model={items}
        popup
        ref={menu}
        id="popup_menu_right"
        popupAlignment="right"
      />
    </div>
  );
};
